# ADR 0006 — Doble motor de scroll: CSS scroll-driven con reserva en JS

**Estado:** aceptada · 2026-08-03

La panorámica (izquierda→derecha, ADR 0005) y el hilo de progreso bajo la
cabecera usan `animation-timeline` nativo (`view()`/`scroll()`) donde el
navegador lo soporta — cero JavaScript, coste a cargo del compositor, no del
hilo principal. Donde no hay soporte (Firefox y Safari a fecha de hoy), un
motor de reserva calcula el mismo progreso 0–1 en JS con
`requestAnimationFrame` y lo escribe en las variables CSS `--pan-p`
(panorámica) y `--thread-p` (hilo de progreso); una única regla CSS por
efecto lee esa variable, así que el layout y la transformación visual **no
se duplican entre motores** — solo cambia quién calcula el progreso.

**Matriz de navegadores:** Chromium (Chrome/Edge/Brave) recientes usan el
motor nativo; Firefox y Safari usan el motor de reserva. Ambos casos deben
producir el mismo resultado visual.

**Cómo se sostiene esa paridad:** `playwright.config.ts` declara los tres
motores (chromium/firefox/webkit) y el CI instala los tres, de modo que
Chromium ejercita el camino nativo y Firefox/WebKit el de reserva. La
prueba de paridad de `tests/a11y.spec.ts` afirma sobre el desplazamiento
observable de la panorámica, no sobre quién lo calcula, así que falla si un
motor deja de moverla. Con un solo proyecto de Playwright —como estaba
hasta 2026-08-04— el motor de reserva no lo ejecutaba ninguna prueba.

**Reglas del motor de reserva** (para que no repita los errores que motivan
este ADR):

- Respeta las mismas condiciones de activación que ADR 0005: solo con
  `prefers-reduced-motion: no-preference`, y para la panorámica además
  ancho mínimo de 48rem — nunca un motor "extra" que la CSS nativa no
  tendría.
- No añade ningún `@keyframes` nuevo: no consume cupo de animación
  (`CLAUDE.md`, regla 2).
- Cero dependencias de cliente: `scroll` con listener pasivo +
  `requestAnimationFrame`, funciones puras testeadas en `viewport.ts`.
- El layout (altura de `.journey-h`, tamaño de paneles, rejilla de
  portales, posición del Nómada) vive fuera de los bloques `@supports`
  específicos de cada motor — es idéntico para los dos, así que solo hay
  un sitio donde puede romperse, no dos.

**Consecuencia:** cualquier efecto de scroll futuro que necesite reserva
para navegadores sin soporte de `animation-timeline` sigue este mismo
patrón: variable CSS custom + cálculo puro en `viewport.ts` + listener con
rAF en `init.ts`. No se duplica lógica visual entre motores.
