# Changelog

Todas las novedades relevantes de numen.games. Formato basado en
[Keep a Changelog](https://keepachangelog.com/es/) y versionado
[SemVer](https://semver.org/lang/es/).

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
