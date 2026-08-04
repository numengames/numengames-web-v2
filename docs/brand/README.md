# Guía del design system «Khepri» — edición del repositorio

Esta guía documenta el subconjunto **ejecutable** del Design System Khepri
v3.0.0 tal y como vive en este repositorio. No sustituye al canon.

## Jerarquía de fuentes (quién manda)

1. **El canon Khepri v3.0.0** (documento externo del cliente, 2026-08-03).
   No está en el repo; las referencias «§N» de esta guía y de los
   comentarios del código apuntan a sus secciones.
2. **`src/styles/tokens.css`** — la fuente de verdad ejecutable. Todo valor
   de color, tipografía, espacio o movimiento sale de ahí. Si esta guía y
   `tokens.css` discrepan, gana `tokens.css` (y esta guía tiene un bug).
3. Esta guía: explica la semántica y los usos que los tokens no pueden
   contar por sí solos.

Regla operativa heredada de `CLAUDE.md`: **ante la duda, tokens mandan y no
se inventan valores**. Cambiar el canon = nuevo ADR (véase `docs/adr/`).

## Paleta

### Colores de identidad `[CANON]`

| Token        | Valor     | Papel                                                        |
| ------------ | --------- | ------------------------------------------------------------ |
| `--turquesa` | `#018ea1` | **Todo lo interactivo** (enlaces, botones, foco)             |
| `--ambar`    | `#efa517` | **Énfasis y logro** (puntos, eyebrows, hallazgos) — nada más |
| `--arena`    | `#f9ebdc` | Tinta sobre oscuro · superficie del Diurno                   |
| `--verdemar` | `#a6dad5` | Secundario de marca                                          |
| `--coral`    | `#f35059` | Alerta suave                                                 |
| `--grana`    | `#d33440` | Error / peligro                                              |

La semántica es cerrada: si algo es clicable es Turquesa; si algo celebra
un hito es Ámbar. Un botón ámbar o un título turquesa son bugs de diseño.

### Variantes de texto `[DERIVADO]`

Mezclas mínimas para cumplir contraste AA como **texto**; el color de marca
puro queda para superficies y trazos grandes:

- Sobre claro: `--turquesa-texto-claro` `#016e7d` · `--ambar-texto-claro`
  `#7a5100` · `--grana-texto-claro` `#b02330`.
- Sobre oscuro: `--turquesa-texto-oscuro` `#1f9cac` (ADR 0007: la marca
  `#018ea1` no llega a 4.5:1 sobre Basalto/Bronce oscuro; esta mezcla da
  4.69:1 en la peor superficie).

### Temas

El sitio es **Nocturno por defecto** y Diurno opcional (`data-theme`).
Los neutros tienen nombre propio y no se usan a pelo: se consumen vía
tokens semánticos (`--surface*`, `--ink*`, `--line*`).

| Semántico            | Nocturno                       | Diurno                        |
| -------------------- | ------------------------------ | ----------------------------- |
| `--surface`          | `#14110f` Noche                | `#f9ebdc`                     |
| `--surface-raised`   | `#1e1a17` Basalto              | `#fdf6ee`                     |
| `--surface-elevated` | `#292420` Bronce oscuro        | `#fdf6ee`                     |
| `--ink`              | `#f9ebdc` Arena                | `#14110f`                     |
| `--ink-muted`        | `#c4b5a6` Arena velada         | `#4a423b`                     |
| `--ink-faint`        | `#8a7d72` Ceniza               | `#6e6259`                     |
| `--line`             | `#241f1b` Sedimento            | `#e2d3c2`                     |
| `--line-strong`      | `#3a332d` Bronce               | `#c8b6a2`                     |
| `--interactive`      | `var(--turquesa-texto-oscuro)` | `var(--turquesa-texto-claro)` |
| `--accent`           | `var(--ambar)`                 | `var(--ambar-texto-claro)`    |
| `--focus-ring`       | `var(--turquesa)`              | `var(--turquesa-texto-claro)` |

### Rareza (solo juego/producto) `[CANON]`

Escala diegética del inventario (`docs/GAMIFICATION.md`): pobre `#f9ebdc` ·
común `#8a7d72` · poco común `#8fc46b` · raro `#5d9bd6` · épico `#a98be0` ·
legendario `#efa517`. El `--halo-legendario` es **el único glow permitido
en todo el sistema**; cualquier otro resplandor está fuera de canon.

## Tipografía

Dos familias, autoalojadas, y ninguna más (`public/fonts/`, licencia OFL
en `LICENSE-Geist.txt`):

- **Geist** (`--stack-display`, `--stack-body`): la voz humana — títulos y
  prosa.
- **Geist Mono** (`--stack-mono` y sus alias `--stack-dialog`,
  `--stack-pixel`, `--stack-serif`): «el mono es la máquina» (§4.2) — la
  voz mecanografiada del juego, HUD, etiquetas y datos.

Escala 1.2 (§4.3) con ajuste fluido: de `--text-etiqueta` (0.75rem) a
`--text-3xl` (display, con `clamp()`). Medida de lectura `--measure: 66ch`;
interlineados `--leading-tight: 1.1` (títulos) y `--leading-normal: 1.55`.
Las fuentes de fantasía/pixel de v0.2.0 están **retiradas por canon**.

## Espacio y forma (§5)

- **Cantos rectos**: `--radius-0: 0` en superficies; el radio `6px`
  (`--radius-ctrl`) existe **solo en controles** (botones, inputs).
- Hairlines de `1px` con `--line`/`--line-strong`; **sin sombras en
  Nocturno** (la profundidad la dan las superficies, no los blur).
- Ritmo: `--section-pad` (~space.900) y `--gutter`, ambos fluidos;
  rejilla de fondo `--grid-size: 76px`.

## Movimiento (§9)

Tokens: `--ease-out: cubic-bezier(0.2, 0, 0, 1)` (motion.ciclo) y tres
duraciones — `--dur-1: 120ms` (instante), `--dur-2: 320ms` (medio),
`--dur-3: 560ms` (largo).

**El cupo de animación está cerrado y COMPLETO (9/9)**: `hero-in · thread ·
caret-blink · pts-rise · panorama · hop · portal-pulse · spawn-out · walk`.
Un `@keyframes` nuevo exige retirar otro **y** ADR. **Parallax y glitch
están prohibidos** (el glitch se purgó en v1.1.1). Toda animación va tras
`.js` + `motionOK`/media query: con `prefers-reduced-motion` o sin
JavaScript, el contenido completo es legible y estático.

## Marca y activos oficiales (§8)

Viven en `public/brand/`, son **siempre `currentColor`** (heredan la tinta
del tema) y se montan únicamente vía `src/components/ui/BrandMark.astro` —
nunca recolorear, nunca copiar el path a mano:

| Activo                              | Uso                                                                                |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| `Numen_Games_Horizontal_Word.svg`   | Wordmark de cabecera                                                               |
| `Numen_Games_Vertical_Word.svg`     | Wordmark en composición vertical                                                   |
| `NG_Logo.svg`                       | Monograma NG                                                                       |
| `Khepri_Logo.svg`                   | Isotipo Khepri — cierre del pie (§8.3)                                             |
| `Khepri_NG_Logo.svg`                | Isotipo + monograma combinados                                                     |
| `Numen_Word.svg`                    | Palabra Numen suelta                                                               |
| `Numinia_Word.svg`                  | Pieza del mundo Numinia (§2.3), no marca corporativa                               |
| `textura-relieve-nocturno-768.webp` | Textura de circuito: fondo del héroe **solo en Nocturno**, `cover`, opacidad ≤ 6 % |

`BrandMark` gestiona además la accesibilidad: decorativo por defecto
(`aria-hidden`) o `role="img"` + `aria-label` si se le pasa etiqueta.

> **Pendiente (BACKLOG P0-2):** logo/wordmark, favicon y `og.png`
> definitivos del cliente. Hasta entonces, estos activos son los del kit.

## Pixel art (sprites)

`src/assets/pixel/`: sprites de rejilla fija con `shape-rendering:
crispEdges`, `aria-hidden` y **tres tonos tematizables** — `currentColor`
(tinta) + `--pa-2` (tono medio) + `--pa-3` (tono claro), que cambian con el
tema. Se inlinan en build (cero peticiones). Personajes: nómada (+ ciclo
`walk`), senet (3 poses), deshilador; objetos: portal, sello, dado, quest,
khepri-px, moneda; telones: `escenarios/` (8). Los sprites generados con
IA están **pendientes de revisión humana** (BACKLOG P0-8) antes de
publicar.

## Accesibilidad (obligatoria, no opinable)

- Contraste **AA** en todo texto real; axe corre en CI a cero violaciones.
- Foco visible universal: `2px` Turquesa con `outline-offset: 2px`.
- Elecciones con `aria-pressed`; anuncios por región viva; regiones
  desplazables enfocables (`role="region"` + `tabindex="0"` + nombre).
- Sin JavaScript, el 100 % del contenido es legible, ambos desenlaces de
  cada elección incluidos.

## Cómo se cambia esto

1. Propuesta en un **ADR** (`docs/adr/`) — igual que ADR 0007 (turquesa
   texto) o el cupo de animación.
2. Si se acepta: primero `tokens.css`, después esta guía, en el mismo PR.
3. Nunca al revés: un valor nuevo que no esté en el canon o en un ADR
   aceptado no entra en `tokens.css`, y un valor que no esté en
   `tokens.css` no entra en ningún componente.
