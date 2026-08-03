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
const PUNCT = /[.,;:!?…»]/;

async function typeText(el: HTMLElement, text: string, isCancelled: () => boolean) {
  el.setAttribute('data-tw-typing', '');
  el.textContent = '';
  for (const ch of text) {
    if (isCancelled()) return;
    el.textContent += ch;
    await sleep(PUNCT.test(ch) ? 130 : 15);
  }
}

/** Mecanografía un elemento corto conservando su HTML final (accesible). */
async function typeRich(el: HTMLElement) {
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
  await typeText(el, text, () => cancelled);
  el.removeAttribute('data-tw-typing');
  el.innerHTML = original;
  el.removeAttribute('aria-hidden');
  sr.remove();
}

/* ------------------------- viaje (estado) ---------------------------- */
const phaseEls = Array.from(document.querySelectorAll<HTMLElement>('[data-phase]'));
const phaseIds = phaseEls.map((el) => el.dataset.phase as string);
const journey: Journey = createJourney(storage, phaseIds);

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
        if (el.querySelector('[data-glitch]') && motionOK) {
          el.querySelectorAll('[data-glitch]').forEach((g) => g.classList.add('auto'));
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
      await sleep(140);
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
    this.querySelectorAll('[data-glitch]').forEach((g) => g.classList.add('auto'));
  }
}
customElements.define('type-writer', TypeWriter);

/* ----------------------- <journey-progress> -------------------------- */
class JourneyProgress extends HTMLElement {
  #last = -1;
  connectedCallback() {
    const update = (snap: JourneySnapshot) => {
      const pct = Math.round(snap.progress * 100);
      this.style.setProperty('--journey-progress', String(snap.progress));
      const bar = this.querySelector('[role="progressbar"]');
      bar?.setAttribute('aria-valuenow', String(pct));

      const score = scoreOf(snap);
      const max = maxScoreOf({
        phases: phaseIds.length,
        choices: document.querySelectorAll('journey-choice').length,
        eggs: 1,
      });
      const pad = (n: number) => String(n).padStart(3, '0');
      const sEl = this.querySelector('[data-score]');
      const mEl = this.querySelector('[data-max]');
      if (sEl) sEl.textContent = pad(score);
      if (mEl) mEl.textContent = pad(max);
      bar?.setAttribute('aria-valuetext', `${pct}% · ${pad(score)}/${pad(max)}`);
      if (motionOK && this.#last >= 0 && score > this.#last) {
        const f = document.createElement('span');
        f.className = 'pts-float';
        f.textContent = `+${score - this.#last}`;
        this.append(f);
        setTimeout(() => f.remove(), 950);
      }
      this.#last = score;
      this.querySelectorAll<HTMLElement>('.journey-act').forEach((a) => {
        const actPhases = (a.dataset.phases ?? '').split(',').filter(Boolean);
        const lit = actPhases.some((p) => snap.visited.includes(p));
        if (lit) a.setAttribute('data-lit', '');
        else a.removeAttribute('data-lit');
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
        open(idx, true);
        announce(`${this.dataset.announce ?? ''} ${btn.textContent?.trim() ?? ''}`.trim());
      });
    });
    const prev = journey.getChoice(id);
    if (typeof prev === 'number') open(prev, false);
  }
}
customElements.define('journey-choice', JourneyChoice);

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
      reveal();
      announce(sigil?.textContent ?? '');
    }
  });
}

/* --------- «Entrar»: registra el cruce del umbral (fase 0) ------------ */
document.querySelector('[data-enter]')?.addEventListener('click', () => {
  journey.markVisited('fase-0');
});
