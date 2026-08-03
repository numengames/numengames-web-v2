/**
 * Progressive enhancement del sitio. Sin este script todo sigue siendo
 * legible y navegable; con él, el viaje se mide, elige y recuerda.
 */
import { createJourney, type Journey, type JourneySnapshot } from './journey';

const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

/* ---------- región viva para anuncios de lector de pantalla ---------- */
function announce(text: string) {
  const region = document.getElementById('sr-announcer');
  if (!region) return;
  region.textContent = '';
  requestAnimationFrame(() => {
    region.textContent = text;
  });
}

/* ------------------------- viaje (estado) ---------------------------- */
const phaseEls = Array.from(document.querySelectorAll<HTMLElement>('[data-phase]'));
const phaseIds = phaseEls.map((el) => el.dataset.phase as string);
const journey: Journey = createJourney(window.localStorage, phaseIds);

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

/* ----------------------- <journey-progress> -------------------------- */
class JourneyProgress extends HTMLElement {
  connectedCallback() {
    const update = (snap: JourneySnapshot) => {
      const pct = Math.round(snap.progress * 100);
      this.style.setProperty('--journey-progress', String(snap.progress));
      const bar = this.querySelector('[role="progressbar"]');
      bar?.setAttribute('aria-valuenow', String(pct));
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
        localStorage.setItem('numen.theme', next);
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
      ack = localStorage.getItem('numen.cookies.ack');
    } catch {
      /* noop */
    }
    if (!ack) this.classList.add('is-open');
    this.querySelector('button')?.addEventListener('click', () => {
      try {
        localStorage.setItem('numen.cookies.ack', '1');
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
