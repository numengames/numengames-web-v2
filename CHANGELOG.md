# Changelog

Todas las novedades relevantes de numen.games. Formato basado en
[Keep a Changelog](https://keepachangelog.com/es/) y versionado
[SemVer](https://semver.org/lang/es/).

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
