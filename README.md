# numen.games — web narrativa

Reconstrucción desde cero de la web de **Numen Games**: una experiencia narrativa en tres actos
(viaje del héroe) con gamificación Nivel B, doble capa (home iniciática + páginas operativas),
i18n ES/EN y accesibilidad WCAG 2.2 AA como pilar.

**Versión:** `1.0.0` (visible en el pie de página, leída de `package.json`).

## Stack

- [Astro 5](https://astro.build) (output estático) + TypeScript estricto
- [Tailwind CSS 4](https://tailwindcss.com) vía `@tailwindcss/vite` (CSS-first con `@theme`)
- Vanilla TS + Web Components para las islas interactivas (sin frameworks de cliente)
- Content Collections + Zod para la historia
- pnpm · ESLint (astro + jsx-a11y strict) · Prettier · Vitest · Playwright + axe · Lighthouse CI
- Fuentes self-hosted vía Fontsource: **Archivo Variable** (cuerpo/capa operativa),
  **Press Start 2P** (HUD y títulos de escena) y **VT323** (diálogo mecanografiado)

## Comandos

| Comando         | Qué hace                                                                |
| --------------- | ----------------------------------------------------------------------- |
| `pnpm dev`      | Servidor de desarrollo                                                  |
| `pnpm build`    | Build de producción en `dist/`                                          |
| `pnpm preview`  | Sirve `dist/` en local                                                  |
| `pnpm check`    | Chequeo de tipos (`astro check`)                                        |
| `pnpm lint`     | ESLint con reglas de accesibilidad                                      |
| `pnpm test`     | Tests unitarios (motor de viaje)                                        |
| `pnpm test:e2e` | Playwright + axe (requiere `playwright install` y `pnpm build` previos) |
| `pnpm format`   | Prettier                                                                |

## Arquitectura

```
src/
├── content/story/{es,en}/   ← LA HISTORIA. Un .md por fase/camino/portal.
├── content.config.ts        ← Esquema Zod de la historia.
├── i18n/ui.ts               ← Diccionario ES/EN + rutas localizadas.
├── styles/tokens.css        ← Design tokens (marca + temas claro/oscuro).
├── styles/global.css        ← Tailwind, componentes CSS, movimiento gated.
├── scripts/journey.ts       ← Motor de gamificación Nivel B (testeable, sin DOM).
├── scripts/init.ts          ← Progressive enhancement (custom elements, observers).
├── layouts/BaseLayout.astro ← Head (hreflang, canonical), tema sin FOUC, landmarks.
├── components/
│   ├── narrative/           ← Hero, fases, caminos, portales, carta de travesía, CTAs.
│   ├── ui/                  ← Header, footer, aviso de cookies.
│   └── a11y/                ← Skip link.
└── pages/{es,en}/           ← Home narrativa + Experiencias/Compañía/Contacto + legales.
```

### Editar la historia

Cada fase vive en `src/content/story/<lang>/NN-nombre.md`. El frontmatter define acto, fase,
orden y tipo (`fase`, `camino`, `portal`); el cuerpo es Markdown (admite HTML puntual:
`class="beat"` para golpes serif, `class="invocation-name"` para el nombre grande,
`data-glitch` para el efecto de grieta). **Cambiar la historia no requiere tocar componentes.**
Cuando llegue el `.md` definitivo, se sustituyen estos ficheros 1:1.

### Capa de aventura gráfica (v0.2.0)

La home se comporta como un point-and-click clásico usando solo convenciones del
género (nada de IP ajena): cada fase es una **escena** con sprite pixelado original,
etiqueta de personaje («El Oráculo») y caja de diálogo que se **mecanografía**
(`<type-writer>`, clic o «▼» para saltar; texto íntegro para lectores de pantalla y
sin animación bajo `prefers-reduced-motion` o sin JS). El HUD muestra **PTS
000/130** (+10 escena, +15 elección, +25 hallazgo) y un **inventario de actos** cuyos
huecos se rellenan con objetos pixelados al cruzar cada acto. Los CTA llevan verbo
(usar / hablar / mirar). `pnpm run` + `node scripts/preview-standalone.mjs` genera
una preview de un solo archivo.

### Panorámica, personajes y sonido (v0.3.0)

En pantallas ≥48rem con `animation-timeline` y sin `prefers-reduced-motion`, la home
se convierte en un **side-scroller**: el scroll vertical desliza los paneles de
izquierda a derecha sobre un suelo pixelado; **el Nómada** (avatar del jugador)
camina cuando avanzas y **Senet** (director de juego) narra cada escena. El audio
8-bit se sintetiza con WebAudio (melodía original + SFX), arranca con «▶ Empezar» y
se controla con el botón de sonido de la cabecera (preferencia en
`localStorage.numen.audio`). Todo degrada: móvil y reduced-motion vuelven a la
lectura vertical, y sin JS el texto completo sigue ahí.

### Gamificación (Nivel B)

- Progreso por fases (`fase-0`…`fase-6`) detectado con IntersectionObserver y guardado en
  `localStorage` (`numen.journey.v1`).
- **Carta de travesía**: medidor fijo con la línea de progreso y los hitos I·II·III, que
  además navegan a cada acto (`#acto-1/2/3`).
- Micro-elección en el camino de Transformación (persistente, con `aria-pressed` y anuncio
  en región viva). **Sin JS** se muestran ambos desenlaces etiquetados: la narrativa nunca
  se rompe.
- Reinicio del viaje en el pie. Huevo de pascua: cinco toques al wordmark revelan el sello
  de Numinia (segundo plano, como acordamos).

### Accesibilidad y movimiento

Skip link, landmarks, jerarquía de encabezados, foco visible, contraste AA en ambos temas,
región `aria-live` para elecciones y cambios de acto. Todo el movimiento (revelados, glitch,
hilo de scroll con `animation-timeline`) está tras `prefers-reduced-motion` y la clase `.js`.

### Temas

Oscuro por defecto de marca; el script inline en `<head>` aplica `localStorage.numen.theme`
o `prefers-color-scheme` antes del primer render (sin FOUC).

## Decisiones tomadas en esta versión

1. **Mapeo 7 fases → 3 actos**: Filtro+Grieta (I) · Invocación+Travesía (II) ·
   Revelación+Verdad+Regreso (III).
2. **Contenido v1** = «Propuesta web narrativa» (marzo 2025), troceada en Content Collections
   para refinarla juntos sin tocar código.
3. **Numinia en segundo plano**: aparece contenida en La Invocación y como huevo de pascua.
4. **Filtro radical** («Esto no es para ti») tal cual; se recalibrará en próximas versiones.
5. Tokens de marca extraídos de los decks 2026 (carbón `#1b1b1f`, oro `#e6cb85`,
   crema `#efdcaa`, retícula) — pendientes de validar contra guía oficial.

## [POR DEFINIR]

- [ ] Logo/wordmark oficial en SVG (ahora: wordmark tipográfico + favicon placeholder).
- [ ] CTA de conversión definitivo (correo real, formulario o agenda) — `hola@numen.games`
      es placeholder en Contacto y legales.
- [ ] Copy literal «No somos / Sí somos» y datos del equipo (Compañía) desde el deck.
- [ ] Material audiovisual del camino de Inmersión.
- [ ] Revisión nativa de la traducción EN.
- [ ] Revisión legal de privacidad/términos/cookies y datos fiscales del responsable.
- [ ] Analítica sin cookies (Plausible/Umami) si se decide activarla.

## CI

`.github/workflows/ci.yml`: tipos → lint (incl. a11y) → unit → build, más trabajos de
accesibilidad (Playwright + axe, WCAG 2.2 AA en 4 rutas) y Lighthouse CI
(perf ≥ 0.9 aviso, a11y ≥ 0.95 bloqueo) sobre el estático.
