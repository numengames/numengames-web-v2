# ADR 0001 — Astro 5 + Tailwind 4 CSS-first, sin frameworks de cliente

**Estado:** aceptada · 2026-08-03

Sitio de contenido con islas interactivas mínimas → Astro estático maximiza
rendimiento (LCP/INP) y simplicidad. Tailwind 4 vía `@theme inline` mapea los
tokens de marca a utilidades manteniendo `tokens.css` como fuente única.
Interactividad con Web Components/vanilla TS: cero runtime de framework.

**Consecuencia:** cualquier UI compleja futura (p. ej. configurador) deberá
justificar añadir un framework en un ADR nuevo.
