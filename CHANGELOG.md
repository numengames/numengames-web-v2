# Changelog

Todas las novedades relevantes de numen.games. Formato basado en
[Keep a Changelog](https://keepachangelog.com/es/) y versionado
[SemVer](https://semver.org/lang/es/).

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
