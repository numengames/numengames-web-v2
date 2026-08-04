/**
 * Progressive enhancement del sitio. Sin este script todo sigue siendo
 * legible y navegable; con él, el viaje se mide, elige y recuerda.
 */
import {
  createJourney,
  maxScoreOf,
  scoreOf,
  type Journey,
  type JourneySnapshot,
  type StorageLike,
} from './journey';
import { panoramaProgress, threadProgress } from './viewport';
import { audio } from './audio';

const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

/* Almacenamiento seguro: si localStorage está bloqueado (sandbox, privacidad
   estricta), degradamos a memoria y la sesión sigue funcionando. */
const storage: StorageLike = (() => {
  try {
    const s = window.localStorage;
    const probe = '__numen.probe';
    s.setItem(probe, '1');
    s.removeItem(probe);
    return s;
  } catch {
    const mem = new Map<string, string>();
    return {
      getItem: (k) => mem.get(k) ?? null,
      setItem: (k, v) => void mem.set(k, v),
      removeItem: (k) => void mem.delete(k),
    };
  }
})();

/* ---------- región viva para anuncios de lector de pantalla ---------- */
function announce(text: string) {
  const region = document.getElementById('sr-announcer');
  if (!region) return;
  region.textContent = '';
  requestAnimationFrame(() => {
    region.textContent = text;
  });
}

/* ---------------- máquina de escribir (utilidades) -------------------- */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function typeText(el: HTMLElement, text: string, isCancelled: () => boolean) {
  el.setAttribute('data-tw-typing', '');
  el.textContent = '';
  for (const ch of text) {
    if (isCancelled()) return;
    el.textContent += ch;
    if (ch !== ' ' && ch !== '\n') audio.blip();
    // Tecleo canónico (§10.1-01): 22 ms/carácter, lineal, sin pausas
    // dramáticas — la pausa de puntuación se propone al canon por ADR.
    await sleep(22);
  }
}

/** Mecanografía un elemento corto conservando su HTML final (accesible). */
async function typeRich(el: HTMLElement, isCancelled: () => boolean = () => false) {
  if (!motionOK) return;
  const original = el.innerHTML;
  const text = el.textContent ?? '';
  const sr = document.createElement('span');
  sr.className = 'visually-hidden';
  sr.textContent = text;
  el.before(sr);
  el.setAttribute('aria-hidden', 'true');
  let cancelled = false;
  el.addEventListener('click', () => (cancelled = true), { once: true });
  await typeText(el, text, () => cancelled || isCancelled());
  el.removeAttribute('data-tw-typing');
  el.innerHTML = original;
  el.removeAttribute('aria-hidden');
  sr.remove();
}

/* ------------------------- viaje (estado) ---------------------------- */
const phaseEls = Array.from(document.querySelectorAll<HTMLElement>('[data-phase]'));
const phaseIds = phaseEls.map((el) => el.dataset.phase as string);
const journey: Journey = createJourney(storage, phaseIds);

/* Preferencia de sonido + desbloqueo con el primer gesto. */
audio.setEnabled(storage.getItem('numen.audio') !== 'off');
document.addEventListener('pointerdown', () => audio.unlockOnly(), { once: true });

/* Marca fases vistas al entrar en viewport y anuncia cambios de acto. */
if (phaseEls.length > 0) {
  let lastAct = '';
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        journey.markVisited(el.dataset.phase as string);
        const act = el.dataset.act ?? '';
        const actLabel = el.dataset.actLabel ?? '';
        if (act && act !== lastAct && actLabel) {
          lastAct = act;
          announce(actLabel);
        }
      }
    },
    { threshold: 0.35 },
  );
  phaseEls.forEach((el) => io.observe(el));
}

/* Revelación progresiva (solo estética; gated también en CSS). */
if (motionOK) {
  const ro = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          ro.unobserve(e.target);
        }
      }
    },
    { threshold: 0.18 },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => ro.observe(el));
}

/* -------------------------- <type-writer> ---------------------------- */
class TypeWriter extends HTMLElement {
  #blocks: HTMLElement[] = [];
  #originals: string[] = [];
  #sr?: HTMLElement;
  #skipBtn?: HTMLButtonElement;
  #idx = 0;
  #started = false;
  #done = false;
  #cancel = false;

  connectedCallback() {
    if (!motionOK) return;
    this.#blocks = Array.from(this.children).filter(
      (c): c is HTMLElement => c instanceof HTMLElement,
    );
    if (this.#blocks.length === 0) return;
    this.#originals = this.#blocks.map((b) => b.innerHTML);

    // Copia íntegra para lectores de pantalla mientras dura la animación.
    const sr = document.createElement('div');
    sr.className = 'visually-hidden';
    sr.innerHTML = this.innerHTML;
    this.before(sr);
    this.#sr = sr;
    this.setAttribute('aria-hidden', 'true');
    this.#blocks.forEach((b) => (b.style.visibility = 'hidden'));

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void this.#run();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(this);
  }

  async #run() {
    if (this.#started) return;
    this.#started = true;
    const dialog = (this.closest('.dialog') as HTMLElement | null) ?? this;
    dialog.setAttribute('data-tw-active', '');
    const skip = document.createElement('button');
    skip.type = 'button';
    skip.className = 'tw-skip';
    skip.textContent = '▼';
    skip.setAttribute('aria-label', this.dataset.skipLabel ?? 'Skip');
    skip.addEventListener('click', (e) => {
      e.stopPropagation();
      this.finish();
    });
    dialog.append(skip);
    this.#skipBtn = skip;
    dialog.addEventListener('click', () => this.finish());

    for (; this.#idx < this.#blocks.length; this.#idx++) {
      if (this.#cancel) return;
      const b = this.#blocks[this.#idx];
      b.style.visibility = '';
      await typeText(b, b.textContent ?? '', () => this.#cancel);
      if (this.#cancel) return;
      b.removeAttribute('data-tw-typing');
      b.innerHTML = this.#originals[this.#idx];
    }
    this.finish();
  }

  finish() {
    if (this.#done) return;
    this.#done = true;
    this.#cancel = true;
    this.#blocks.forEach((b, i) => {
      b.removeAttribute('data-tw-typing');
      b.style.visibility = '';
      b.innerHTML = this.#originals[i];
    });
    this.removeAttribute('aria-hidden');
    this.#sr?.remove();
    this.#skipBtn?.remove();
    const dialog = (this.closest('.dialog') as HTMLElement | null) ?? this;
    dialog.removeAttribute('data-tw-active');
  }
}
customElements.define('type-writer', TypeWriter);

/* ----------------------- <journey-progress> -------------------------- */
class JourneyProgress extends HTMLElement {
  #last = -1;
  #lit = new Set<string>();
  connectedCallback() {
    const update = (snap: JourneySnapshot) => {
      const pct = Math.round(snap.progress * 100);
      this.style.setProperty('--journey-progress', String(snap.progress));
      const bar = this.querySelector('[role="progressbar"]');
      bar?.setAttribute('aria-valuenow', String(pct));

      const score = scoreOf(snap);
      /* Elecciones alcanzables: las libres cuentan todas; las filtradas
         por rol (tres activaciones, una por rol) solo pueden jugarse UNA
         por visitante — contarlas todas prometería un máximo imposible. */
      const elecciones = Array.from(document.querySelectorAll('escena-eleccion'));
      const conRol = elecciones.filter((e) => e.closest('[data-rol]') !== null).length;
      const max = maxScoreOf({
        /* Los eggs alcanzables se derivan del DOM, no se fijan a mano: el
           del wordmark existe siempre; el del Umbral solo cuenta cuando los
           enlaces-tesoro se renderizan (esperan P0-1/P0-4 en i18n/ui.ts).
           Así el «PTS máx» del HUD nunca promete tesoros inalcanzables. */
        phases: phaseIds.length,
        choices:
          document.querySelectorAll('journey-choice').length +
          (elecciones.length - conRol) +
          (conRol > 0 ? 1 : 0),
        eggs: 1 + (document.querySelector('[data-tesoro-link]') ? 1 : 0),
      });
      const pad = (n: number) => String(n).padStart(3, '0');
      const sEl = this.querySelector('[data-score]');
      const mEl = this.querySelector('[data-max]');
      if (sEl) sEl.textContent = pad(score);
      if (mEl) mEl.textContent = pad(max);
      bar?.setAttribute('aria-valuetext', `${pct}% · ${pad(score)}/${pad(max)}`);
      const isFirst = this.#last < 0;
      if (!isFirst && score - this.#last === 10) audio.coin();
      if (motionOK && this.#last >= 0 && score > this.#last) {
        const f = document.createElement('span');
        f.className = 'pts-float';
        f.textContent = `+${score - this.#last}`;
        this.append(f);
        setTimeout(() => f.remove(), 950);
      }
      this.#last = score;
      const recapScore = document.querySelector('[data-recap-score]');
      if (recapScore) recapScore.textContent = pad(score);
      document.querySelectorAll<HTMLElement>('.recap-items li[data-phases]').forEach((li) => {
        const ph = (li.dataset.phases ?? '').split(',').filter(Boolean);
        if (ph.some((p) => snap.visited.includes(p))) li.setAttribute('data-got', '');
        else li.removeAttribute('data-got');
      });
      document
        .getElementById('recap-khepri')
        ?.classList.toggle('is-found', snap.eggs.includes('sigil'));
      this.querySelectorAll<HTMLElement>('.journey-act').forEach((a) => {
        const key = a.dataset.phases ?? '';
        const actPhases = key.split(',').filter(Boolean);
        const lit = actPhases.some((p) => snap.visited.includes(p));
        if (lit) {
          a.setAttribute('data-lit', '');
          if (!this.#lit.has(key)) {
            this.#lit.add(key);
            if (!isFirst) audio.chime();
          }
        } else {
          a.removeAttribute('data-lit');
          this.#lit.delete(key);
        }
      });
    };
    update(journey.snapshot());
    window.addEventListener('journey:change', ((e: CustomEvent<JourneySnapshot>) =>
      update(e.detail)) as EventListener);
  }
}
customElements.define('journey-progress', JourneyProgress);

/* ------------------------ <journey-choice> --------------------------- */
class JourneyChoice extends HTMLElement {
  connectedCallback() {
    const id = this.dataset.id ?? 'choice';
    const buttons = Array.from(this.querySelectorAll<HTMLButtonElement>('button[data-option]'));
    const outcomes = Array.from(this.querySelectorAll<HTMLElement>('[data-outcome]'));
    const open = (idx: number, focus: boolean) => {
      buttons.forEach((b) =>
        b.setAttribute('aria-pressed', String(Number(b.dataset.option) === idx)),
      );
      outcomes.forEach((o) => o.classList.toggle('is-open', Number(o.dataset.outcome) === idx));
      const chosen = outcomes.find((o) => Number(o.dataset.outcome) === idx);
      if (chosen && focus) {
        chosen.setAttribute('tabindex', '-1');
        chosen.focus({ preventScroll: true });
        const line = chosen.querySelector<HTMLElement>('p:not(.outcome-label)');
        if (line) void typeRich(line);
      }
    };
    buttons.forEach((btn) => {
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.option);
        journey.choose(id, idx);
        audio.confirm();
        open(idx, true);
        announce(`${this.dataset.announce ?? ''} ${btn.textContent?.trim() ?? ''}`.trim());
      });
    });
    const prev = journey.getChoice(id);
    if (typeof prev === 'number') open(prev, false);
  }
}
customElements.define('journey-choice', JourneyChoice);

/* ----------------------- <escena-eleccion> ---------------------------
   Elección diegética del motor de escena (ADR 0009). Mismo contrato que
   <journey-choice>: botones server-rendered (sin JS, botones y TODAS las
   consecuencias son legibles), persistencia en numen.journey.v1 vía
   journey.choose (elección = 15 PTS del SCORING vigente, journey.ts
   intacto) y anuncio por región viva. La elección de rol además filtra
   los beats etiquetados con data-rol, estilo aventura por caminos. */
function aplicarRol(rol: string | undefined) {
  if (rol === undefined) return;
  document.documentElement.dataset.rolActivo = rol;
  document.querySelectorAll<HTMLElement>('.beat-turno[data-rol]').forEach((beat) => {
    beat.hidden = beat.dataset.rol !== rol;
  });
}

class EscenaEleccion extends HTMLElement {
  connectedCallback() {
    const id = `escena-${this.dataset.id ?? 'eleccion'}`;
    const buttons = Array.from(this.querySelectorAll<HTMLButtonElement>('button[data-option]'));
    const consecuencias = Array.from(this.querySelectorAll<HTMLElement>('[data-consecuencia]'));
    const open = (idx: number) => {
      buttons.forEach((b) =>
        b.setAttribute('aria-pressed', String(Number(b.dataset.option) === idx)),
      );
      consecuencias.forEach((c) =>
        c.classList.toggle('is-elegida', Number(c.dataset.consecuencia) === idx),
      );
    };
    buttons.forEach((btn) => {
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.option);
        journey.choose(id, idx);
        audio.confirm();
        open(idx);
        aplicarRol(btn.dataset.rolOpcion);
        const consecuencia = consecuencias.find((c) => Number(c.dataset.consecuencia) === idx);
        announce(
          `${this.dataset.announce ?? ''} ${btn.textContent?.trim() ?? ''}. ${consecuencia?.textContent?.trim() ?? ''}`.trim(),
        );
      });
    });
    const prev = journey.getChoice(id);
    if (typeof prev === 'number') {
      open(prev);
      aplicarRol(buttons[prev]?.dataset.rolOpcion);
    }
  }
}
customElements.define('escena-eleccion', EscenaEleccion);

/* ----------------------- <escena-dialogo> -----------------------------
   Tecleo progresivo del guion (§2.4: el diálogo hereda el tecleo #01).
   Los beats se revelan de uno en uno y su texto se escribe con typeRich
   (que mantiene copia accesible mientras teclea). Un clic en la caja
   completa todo al instante. Sin JS o con movimiento reducido este
   controlador no oculta nada: el guion entero está escrito. */
class EscenaDialogo extends HTMLElement {
  #started = false;
  #skipAll = false;

  connectedCallback() {
    if (!motionOK) return;
    const beats = Array.from(this.querySelectorAll<HTMLElement>('.beat-turno'));
    if (beats.length === 0) return;
    beats.forEach((beat, i) => {
      if (i > 0) beat.hidden = true;
    });
    this.addEventListener('click', () => (this.#skipAll = true));
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void this.#run(beats);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(this);
  }

  async #run(beats: HTMLElement[]) {
    if (this.#started) return;
    this.#started = true;
    for (const beat of beats) {
      beat.hidden = false;
      this.scrollTop = this.scrollHeight;
      if (this.#skipAll) continue;
      const bloques = Array.from(
        beat.querySelectorAll<HTMLElement>('.beat-parlamento, .beat-acotacion, .eleccion-pregunta'),
      );
      for (const bloque of bloques) {
        if (this.#skipAll) break;
        await typeRich(bloque, () => this.#skipAll);
        this.scrollTop = this.scrollHeight;
      }
    }
  }
}
customElements.define('escena-dialogo', EscenaDialogo);

/* ------------------------- <journey-reset> --------------------------- */
class JourneyReset extends HTMLElement {
  connectedCallback() {
    const btn = this.querySelector('button');
    btn?.addEventListener('click', () => {
      journey.reset();
      document
        .querySelectorAll('.choice-outcome.is-open')
        .forEach((o) => o.classList.remove('is-open'));
      document
        .querySelectorAll('button[data-option]')
        .forEach((b) => b.setAttribute('aria-pressed', 'false'));
      /* Motor de escena (ADR 0009): al reiniciar, las consecuencias se
         repliegan y el filtro de rol se levanta. */
      document
        .querySelectorAll('[data-consecuencia].is-elegida')
        .forEach((c) => c.classList.remove('is-elegida'));
      document
        .querySelectorAll<HTMLElement>('.beat-turno[data-rol]')
        .forEach((beat) => (beat.hidden = false));
      delete document.documentElement.dataset.rolActivo;
      announce(this.dataset.done ?? 'Reset');
    });
  }
}
customElements.define('journey-reset', JourneyReset);

/* -------------------------- <theme-toggle> --------------------------- */
class ThemeToggle extends HTMLElement {
  connectedCallback() {
    const btn = this.querySelector('button');
    btn?.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        storage.setItem('numen.theme', next);
      } catch {
        /* noop */
      }
      announce(next === 'dark' ? (this.dataset.darkOn ?? '') : (this.dataset.lightOn ?? ''));
    });
  }
}
customElements.define('theme-toggle', ThemeToggle);

/* -------------------------- <cookie-notice> -------------------------- */
class CookieNotice extends HTMLElement {
  connectedCallback() {
    let ack = null;
    try {
      ack = storage.getItem('numen.cookies.ack');
    } catch {
      /* noop */
    }
    if (!ack) this.classList.add('is-open');
    this.querySelector('button')?.addEventListener('click', () => {
      try {
        storage.setItem('numen.cookies.ack', '1');
      } catch {
        /* noop */
      }
      this.classList.remove('is-open');
    });
  }
}
customElements.define('cookie-notice', CookieNotice);

/* --------- Easter egg: cinco toques al wordmark → sello de Numinia ---- */
{
  const mark = document.querySelector('[data-wordmark]');
  const sigil = document.getElementById('numinia-sigil');
  let taps = 0;
  let timer: number | undefined;
  const reveal = () => sigil?.classList.add('is-found');
  if (journey.hasEgg('sigil')) reveal();
  mark?.addEventListener('click', () => {
    taps += 1;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => (taps = 0), 1500);
    if (taps >= 5 && !journey.hasEgg('sigil')) {
      journey.unlockEgg('sigil');
      audio.secret();
      reveal();
      // Pulso legendario (§10.1-05): SOLO el momento de obtención — en
      // visitas posteriores `reveal()` deja el halo estático.
      sigil?.classList.add('is-obtained');
      announce(sigil?.textContent ?? '');
    }
  });
}

/* --------- Tesoro del Umbral: usar un CTA de conversión es hallazgo --- */
/* Los enlaces son <a> planos (UmbralTesoros.astro): sin JS navegan igual
   y simplemente no hay hallazgo — degradación aceptada. Sin preventDefault:
   unlockEgg persiste en numen.journey.v1 de forma síncrona dentro del click,
   antes de que el navegador siga la href (el mailto ni abandona la página).
   Sin animación propia; el flotante de PTS del HUD ya va tras motionOK. */
{
  const wrap = document.querySelector<HTMLElement>('[data-umbral-tesoro]');
  if (wrap) {
    const found = wrap.dataset.announce ?? '';
    wrap.querySelectorAll<HTMLAnchorElement>('[data-tesoro-link]').forEach((link) => {
      link.addEventListener('click', () => {
        if (journey.hasEgg('tesoro-umbral')) return;
        journey.unlockEgg('tesoro-umbral');
        audio.secret();
        announce(found);
      });
    });
  }
}

/* --------- «Entrar»: registra el cruce del umbral (fase 0) ------------ */
/* «Empezar»: el Nómada cruza el portal y después avanzamos. */
{
  if (journey.hasVisited('fase-0')) document.documentElement.classList.add('has-spawned');
  const enter = document.querySelector<HTMLAnchorElement>('[data-enter]');
  enter?.addEventListener('click', (e) => {
    e.preventDefault();
    journey.markVisited('fase-0');
    audio.userGesture();
    const id = enter.getAttribute('href')?.slice(1);
    const target = id ? document.getElementById(id) : null;
    const go = () => {
      if (!target) return;
      if (!scrollToPanelIfHorizontal(target)) {
        target.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto' });
      }
    };
    const spawned = document.documentElement.classList.contains('has-spawned');
    if (!spawned && motionOK) {
      document.body.classList.add('is-spawning');
      audio.chime();
      window.setTimeout(() => {
        document.documentElement.classList.add('has-spawned');
        document.body.classList.remove('is-spawning');
        go();
      }, 1180);
    } else {
      document.documentElement.classList.add('has-spawned');
      go();
    }
  });
}

/* -------------------------- <audio-toggle> --------------------------- */
class AudioToggle extends HTMLElement {
  connectedCallback() {
    const btn = this.querySelector('button');
    const apply = (on: boolean) => btn?.setAttribute('aria-pressed', String(on));
    apply(audio.enabled);
    btn?.addEventListener('click', () => {
      const next = !audio.enabled;
      audio.setEnabled(next);
      storage.setItem('numen.audio', next ? 'on' : 'off');
      apply(next);
      announce(next ? (this.dataset.on ?? '') : (this.dataset.off ?? ''));
    });
  }
}
customElements.define('audio-toggle', AudioToggle);

/* --------- Panorámica: anclas por panel y paseo del Nómada ------------ */
/* horizontalOn() ya no exige el motor nativo: el layout panorámico (ADR
   0006) es el mismo para los dos motores, solo cambia quién produce el
   desplazamiento horizontal. */
const horizontalMQ = window.matchMedia(
  '(prefers-reduced-motion: no-preference) and (min-width: 48rem)',
);
const horizontalOn = () => horizontalMQ.matches;

const journeyWrap = document.querySelector<HTMLElement>('.journey-h');
const journeyPanorama = document.querySelector<HTMLElement>('.journey-panorama');
const panels = Array.from(document.querySelectorAll<HTMLElement>('.journey-panorama > .panel'));

function scrollToPanelIfHorizontal(target: HTMLElement): boolean {
  if (!horizontalOn()) return false;
  return scrollToPanel(target, motionOK);
}

function scrollToPanel(target: HTMLElement, smooth: boolean): boolean {
  if (!journeyWrap) return false;
  const idx = panels.findIndex((p) => p === target || p.contains(target));
  if (idx < 0) return false;
  const top = journeyWrap.offsetTop + idx * window.innerHeight;
  window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
  return true;
}

if (journeyWrap && panels.length > 0) {
  document.addEventListener('click', (e) => {
    if (!horizontalOn()) return;
    const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')?.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target && journeyWrap.contains(target) && scrollToPanel(target, motionOK)) {
      e.preventDefault();
    }
  });

  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target && journeyWrap.contains(target)) {
      requestAnimationFrame(() => {
        if (horizontalOn()) scrollToPanel(target, false);
      });
    }
  }

  const walker = document.querySelector('.nomada-walker');
  if (walker) {
    let idleTimer: number | undefined;
    window.addEventListener(
      'scroll',
      () => {
        if (!horizontalOn()) return;
        walker.classList.add('is-walking');
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => walker.classList.remove('is-walking'), 170);
      },
      { passive: true },
    );
  }
}

/* --------- Motor de reserva (ADR 0006) ---------------------------------
   Donde el navegador no soporta animation-timeline nativo, calculamos el
   mismo progreso 0–1 aquí y lo escribimos como variable CSS; viewport.ts
   hace el cálculo (puro, testeado), esto solo lee el scroll y escribe. */
const scrollTimelineOn = () => CSS.supports('animation-timeline: scroll()');
const viewTimelineOn = () => CSS.supports('animation-timeline: view()');
const threadFallbackNeeded = motionOK && !scrollTimelineOn();
const panoramaFallbackNeeded =
  motionOK && !viewTimelineOn() && journeyWrap !== null && journeyPanorama !== null;

if (threadFallbackNeeded || panoramaFallbackNeeded) {
  let ticking = false;

  /* Geometría del recorrido, cacheada. Leerla dentro del fotograma de
     scroll —después de haber escrito una variable CSS— fuerza un reflujo
     síncrono en cada fotograma; solo cambia con el layout, así que se
     remide al redimensionar, no al desplazarse. */
  let journeyTop = 0;
  let journeyHeight = 0;

  function measureJourney() {
    if (!journeyWrap) return;
    journeyTop = journeyWrap.offsetTop;
    journeyHeight = journeyWrap.offsetHeight;
  }

  function writeProgressVars() {
    ticking = false;
    /* Fase de lectura: toda la geometría antes de tocar un solo estilo. */
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const docHeight = threadFallbackNeeded ? document.documentElement.scrollHeight : 0;
    const panoramaOn = panoramaFallbackNeeded && journeyPanorama !== null && horizontalOn();

    /* Fase de escritura. */
    if (threadFallbackNeeded) {
      const p = threadProgress(scrollY, docHeight, viewportHeight);
      document.documentElement.style.setProperty('--thread-p', String(p));
    }
    if (panoramaOn && journeyPanorama) {
      const p = panoramaProgress(scrollY, journeyTop, journeyHeight, viewportHeight);
      journeyPanorama.style.setProperty('--pan-p', String(p));
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(writeProgressVars);
  }

  /* Al redimensionar cambian `100vw`, la altura del recorrido y el umbral
     de 48rem: sin esto las variables quedan obsoletas —y la panorámica
     desalineada— hasta el siguiente scroll. */
  function onResize() {
    measureJourney();
    onScroll();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onResize, { passive: true });

  measureJourney();
  writeProgressVars();
}
