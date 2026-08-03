# ADR 0003 — i18n con prefijo obligatorio y slugs localizados

**Estado:** aceptada · 2026-08-03

`/es/…` y `/en/…` siempre prefijados (`prefixDefaultLocale: true`), raíz
redirige a `/es/`. Los slugs se traducen (`experiencias` ↔ `experiences`) vía
el mapa `routes` de `src/i18n/ui.ts`, que también alimenta `hreflang` y el
selector de idioma. Los `id` de ancla internos (#networking…) son estables
entre idiomas para no romper los portales.
