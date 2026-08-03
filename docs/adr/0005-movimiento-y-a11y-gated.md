# ADR 0005 — Todo el movimiento es mejora progresiva y respetuosa

**Estado:** aceptada · 2026-08-03

Revelados, glitch e hilo de scroll solo se activan con JS presente (clase
`.js`) **y** `prefers-reduced-motion: no-preference`; el hilo usa
`animation-timeline: scroll()` tras `@supports`. Sin JS la narrativa completa
es legible (incluidos ambos desenlaces de cada elección, etiquetados). La
gamificación nunca oculta contenido: ilumina, no bloquea.
