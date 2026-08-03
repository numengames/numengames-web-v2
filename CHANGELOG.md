# Changelog

Todas las novedades relevantes de numen.games. Formato basado en
[Keep a Changelog](https://keepachangelog.com/es/) y versionado
[SemVer](https://semver.org/lang/es/).

## [1.1.0] — 2026-08-03

Capa de gobernanza para publicar el repositorio con estándares de compañía,
consolidada **sobre** el canon Khepri v1.0.0 tras auditoría multi-rol
(`docs/AUDIT_2026-08-03.md`).

### Añadido

- Gobernanza: LICENSE propietaria, NOTICE (Geist OFL + activos del kit),
  SECURITY, CONTRIBUTING (Conventional Commits, DoD, firma), código de
  conducta, CODEOWNERS, plantillas de PR e issues, Dependabot y hooks de
  commit (husky + lint-staged + commitlint).
- Documentación de equipo en `docs/`: ADRs 0001–0005, guía de gamificación
  (actualizada al canon), guía de contenido y voz, checklist legal, backlog
  priorizado, checklist de release, guía de despliegue y auditoría
  2026-08-03 con forense de procedencia.
- Declaración de accesibilidad (`/es/accesibilidad` · `/en/accessibility`)
  enlazada en el pie.
- Cabeceras de seguridad (`public/_headers`), `.well-known/security.txt`,
  OG image sobre paleta canon y metadatos sociales (Open Graph + Twitter).
- CI endurecido: permisos mínimos, cancelación por concurrencia.

### Cambiado

- Retiradas las dependencias Fontsource (Archivo/Fraunces): el canon usa
  Geist/Geist Mono del kit. Limpieza del alias tipográfico legacy.

### Corregido

- CHANGELOG reordenado: las entradas de gobernanza salen de 0.1.0.

## [1.0.0] — 2026-08-03

Refundación visual sobre el **Design System oficial «Khepri» v3.0.0** (canon) y
los recursos del Khepri Kit entregados por el cliente. Cambio de dirección ⇒
versión mayor (§15 del sistema).

### Añadido

- **Paleta canónica** Nocturno/Diurno (Noche `#14110F`, Basalto, Arena…) con
  semántica del sistema: **Turquesa** `#018EA1` para todo lo interactivo,
  **Ámbar** `#EFA517` solo para énfasis y logro (puntos, eyebrows, hallazgos).
- **Geist + Geist Mono autoalojadas** (woff2 variables del kit, `font-display:
swap`). La voz mecanografiada del juego pasa a Geist Mono: el mono «es la
  máquina» (§4.2) y sustituye a las fuentes de fantasía, prohibidas por canon.
- **Sprites del cliente** (9 PNG pixel art) convertidos a SVG tematizable por
  `scripts/pixel-svg.mjs` (rejilla fija, 3 tonos → `currentColor`/`--pa-2`/
  `--pa-3`, RLE): portal, Nómada, máscara de Senet, libro-quest «!», d20, token,
  sello, Khepri píxel. El wordmark píxel (129) se genera pero **se retira** de la
  entrega (checklist §17.4: «se ha retirado un elemento»).
- **Secuencia de aparición**: al pulsar «▶ Empezar» el portal late y el Nómada
  cruza (steps, `motion.largo`), después la vista avanza; con
  `prefers-reduced-motion` o en visitas posteriores, entrada directa. El estado
  persiste (`has-spawned`).
- **Inventario con escala de rareza** (§3.7): Sello de la Grieta _poco común_,
  de la Travesía _raro_, del Regreso _épico_ — borde progresivo + nombre escrito;
  el hallazgo oculto es **Khepri legendario**, único halo permitido del sistema.
- **Marca oficial**: wordmark horizontal en cabecera, **isotipo Khepri como
  cierre** del pie (path canónico §8.3), favicon Khepri con `prefers-color-scheme`,
  huevo Numinia con `Numinia_Word.svg` (pieza del mundo, §2.3).
- **Materia**: textura de relieve de circuito (webp 14 KB) como fondo del héroe
  solo en Nocturno, `cover`, ≤6 %; **separador binario** `10100…→xxx` en Geist
  Mono antes del pie; recap final con puntuación y sellos.

### Cambiado

- Forma canon: cantos rectos y hairlines `1px` en superficies, radio `6px` solo
  en controles, **sin sombras en Nocturno**; fuera scanlines, muescas y
  drop-shadows píxel. Foco `2px` Turquesa offset `2px` en todo.
- Movimiento con tokens del sistema (120/200/320/560 ms, `cubic-bezier(0.2,0,0,1)`).
- Suelo y glitch en neutros; HUD plano con barra turquesa y token de puntos.

### Retirado

- Dependencias `@fontsource` (Archivo, Press Start 2P, VT323) y los iconos de
  fase propios (los conceptos de mundo usan ahora los sprites del kit).

## [0.3.0] — 2026-08-03

### Añadido

- **Panorámica izquierda → derecha**: el scroll vertical nativo desliza el mundo en
  horizontal mediante CSS scroll-driven animations (`view-timeline` + sticky). Cada
  fase y cada camino es ahora un panel a pantalla completa con suelo pixelado.
  Fallback automático a la lectura vertical en móvil (<48rem), con
  `prefers-reduced-motion` o sin soporte del navegador; las anclas (#acto-N, Empezar,
  HUD) se recalculan por panel en modo panorámico.
- **Personajes**: **Senet**, el director de juego, narra todos los diálogos (sprite
  con báculo y banda de tablero, guiño al juego egipcio); **el Nómada**, avatar
  encapuchado del jugador, camina por el suelo con ciclo de 2 frames mientras
  avanzas y aparece de cameo en la portada en modo vertical. Arte 100 % original.
- **Audio 8-bit sintetizado** (WebAudio, sin archivos): melodía original en bucle
  (cuadrada + triángulo, la dórico) que arranca al pulsar «▶ Empezar»; blips de
  máquina de escribir, confirmación de elección, moneda al puntuar, campanilla al
  llenar un hueco del inventario y jingle del hallazgo secreto. **Botón de
  silenciar** en la cabecera con preferencia persistida (`numen.audio`) y pausa
  automática al ocultar la pestaña.

### Cambiado

- Los caminos de la Travesía dejan de ser tarjetas anidadas y pasan a ser paneles
  propios de la ruta (mismo contenido .md).
- El icono de cada fase se integra junto al nombre de Senet en la caja de diálogo.

### Pendiente

- Fotos de referencia de los personajes anunciadas por el cliente: no llegaron
  adjuntas; los sprites actuales son propuesta propia a la espera de ese material.

## [0.2.0] — 2026-08-03

### Añadido

- **Capa de aventura gráfica**: la home ahora se lee como un point-and-click clásico
  (convenciones del género con arte y UI 100 % originales).
- Diálogos mecanografiados (`<type-writer>`): velocidad viva, pausa en puntuación,
  clic o botón «▼» para saltar; copia íntegra para lectores de pantalla; sin JS o con
  `prefers-reduced-motion`, todo el texto aparece de inmediato.
- Puntuación estilo Sierra en el HUD (`PTS 000/130`): +10 por escena, +15 por elección,
  +25 por hallazgo, con «+N» flotante e `aria-valuetext` en la barra.
- Inventario de actos: tres huecos que se rellenan con objetos pixelados
  (fragmento, brújula, llave) al cruzar cada acto; siguen navegando a #acto-N.
- Sprites originales 16×16 por escena (grieta, portal, brújula, puertas, pergamino,
  salida) y barra de progreso segmentada.
- Tipografías del género: Press Start 2P (HUD/títulos) y VT323 (diálogo), self-hosted.
- Verbos en los CTA (usar / hablar / mirar) y opciones de elección con «▸».
- Textura CRT sutil (se desactiva con `prefers-contrast: more`) y botones con
  pulsación física.
- `scripts/preview-standalone.mjs`: genera una preview de un solo archivo desde `dist/`.

### Cambiado

- Fraunces se retira; la voz «serif» pasa a VT323 en toda la piel.
- El desenlace de cada elección también se mecanografía al elegirlo.

## [0.1.0] — 2026-08-03

### Añadido

- Repositorio inicial: Astro 5 + Tailwind CSS 4 (CSS-first) + TypeScript estricto + pnpm.
- Sistema de diseño: tokens de marca (carbón/oro/retícula) con temas claro y oscuro sin FOUC.
- Home narrativa en tres actos alimentada por Content Collections (`src/content/story`),
  con la «Propuesta web narrativa» (marzo 2025) como contenido v1.
- Motor de gamificación Nivel B: progreso por fases en `localStorage`, carta de travesía
  (medidor con hitos por acto), micro-elección en Transformación, reinicio y huevo de
  pascua de Numinia.
- i18n ES/EN con rutas localizadas, páginas Experiencias/Compañía/Contacto y legales
  (borradores marcados para revisión).
- Aviso de cookies (solo almacenamiento esencial) y versión semántica visible en el pie.
- CI: tipos, lint (incl. reglas a11y), tests unitarios, build, axe/Playwright y Lighthouse.
- Endurecimiento: almacenamiento seguro con fallback en memoria.
