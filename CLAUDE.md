# CLAUDE.md — contexto operativo del repositorio

Léeme entero antes de tocar nada. Si algo de aquí contradice a un humano del
equipo, gana el humano; si contradice a tu intuición, gano yo.

## Cómo explicar el trabajo

El propietario del repo es junior/en aprendizaje. Cada vez que se ejecute un
comando, se edite código o se tome una decisión técnica, explícalo como a un
dev junior: qué se hace, por qué esa opción y no otra, y qué efecto tiene.
No lo dejes para un resumen final — explica mientras ejecutas, no después.

## Qué es esto y para quién

Web narrativa de **numen.games** (Numen Games: estructuras de juego y
narrativa para eventos B2B — leads cualificados, no entretenimiento). La
home es una aventura en tres actos que **filtra e inicia** («Esto no es para
ti. Es para aventureros.»); las páginas internas venden con lenguaje de
negocio. Público: organizadores de eventos y sponsors, España, ES/EN.
El idioma de trabajo del repo (docs, commits, issues) es el **español**.

## Stack (no negociable sin ADR)

- **Astro 5** estático · **Tailwind 4 CSS-first** (`@theme` en
  `src/styles/tokens.css`; no hay tailwind.config) · **TypeScript estricto**
  · **pnpm 11** (builds de dependencias bloqueados; allowlist en
  `pnpm-workspace.yaml`).
- Contenido en **Content Collections + Zod** (`src/content/story/{es,en}`).
- Interactividad: **Web Components vanilla** (`src/scripts/`). Cero
  frameworks de cliente, cero dependencias runtime nuevas sin ADR.

## Design system: canon «Khepri» v3.3.0 — NORMATIVO

- **El canon completo VIVE EN EL REPO**:
  `docs/brand/2026_08_04-Numen_Design_System-v3.3.0.md` (protegido de
  prettier: fidelidad byte a byte). Su §19 es el contrato de agente:
  precedencia persona → accesibilidad → canon, y **ningún valor fuera de
  §19.3**.
- La fuente de verdad ejecutable es `src/styles/tokens.css` (paleta
  Nocturno/Diurno: Noche `#14110f`, Basalto, Arena, Turquesa = interactivo,
  Ámbar = énfasis y logro; tipografías **Geist**, **Geist Mono** y
  **Pixelify Sans** — esta última SOLO para el registro píxel, a múltiplos
  exactos 22/33/44 px).
- El **registro píxel** (§2.4/§3.7): la escena del motor es SIEMPRE
  Nocturna, paleta cerrada Khepri-16, sprites a escala entera. Los colores
  de hablante están restringidos por el validador (regla (h), ADR 0011).
- Activos oficiales: `public/brand/` (marcas, siempre `currentColor`, nunca
  recolorear) · `src/assets/pixel/` (sprites) · `public/fonts/` (cada
  fuente con su licencia OFL).
- La guía del DS vive en `docs/brand/README.md` (semántica y usos). Las
  desviaciones vigentes al canon (todas por accesibilidad) están en
  `docs/adr/0011`. Ante la duda: tokens mandan y **no inventes valores**.

## Comandos

```bash
pnpm dev        # desarrollo
pnpm build      # estático → dist/
pnpm check      # tipos (astro check)
pnpm lint       # ESLint + jsx-a11y strict
pnpm test       # Vitest (motor de viaje)
pnpm test:e2e   # axe/Playwright (build previo; navegadores solo en CI)
node scripts/preview-standalone.mjs out.html   # preview autocontenida
```

Puerta mínima antes de cualquier commit: `check + lint + test + build`.

## Reglas duras

1. **Presupuesto de página: ≤ 1 MB** transferido en la home (hoy ≈ 265 KB:
   HTML 69 + CSS 36 + JS 13 + Geist 57 + Geist Mono 58 + Pixelify 12 +
   textura 15). El CI lo bloquea
   (`lighthouserc.json → resource-summary:total:size`).
2. **El movimiento se rige por el catálogo del canon (§10.1) y la ley de
   sprites (§10.4)** — ADR 0010. Toda animación de interfaz ES una pieza
   del catálogo con su spec exacta; los sprites: 2–4 fotogramas a
   120/200/320 ms, sin tweening. Un `@keyframes` nuevo solo puede
   implementar una pieza del catálogo aún no implementada (pendientes:
   tecleo del titular del héroe #09 completo, fase lunar #06).
   **Parallax y efectos glitch PROHIBIDOS** por canon (el glitch de v0.1.0
   fue purgado en v1.1.1; no lo resucites).
3. **`prefers-reduced-motion` siempre**: toda animación va tras `.js` +
   `motionOK`/media query; sin JavaScript el 100 % del contenido es legible
   (ambos desenlaces de cada elección incluidos).
4. **Gamificación diegética** (`docs/GAMIFICATION.md`): PTS, inventario y
   rareza mapean hitos narrativos reales. Rankings, temporizadores y cebos
   de engagement: vetados.
5. **ES + EN a la vez**; textos solo en `src/content/` o `src/i18n/ui.ts`,
   jamás hardcodeados en componentes.
6. **A11y AA**: axe en CI a cero violaciones; foco visible; `aria-pressed`
   en elecciones; anuncios por región viva.
7. **Audio solo tras gesto** y con silenciador; cualquier clave nueva de
   almacenamiento se inventaría en `/legal/cookies` (ES y EN) y en docs.
8. **Sin red en cliente** (fetch, analítica, terceros): requiere ADR +
   revisión legal.
9. Colores y tipografías **solo** desde tokens; marcas solo desde
   `public/brand/` vía `BrandMark`.

## Commits y versionado

- **Conventional Commits en español** (`feat:`, `fix:`, `docs:`,
  `content:`…), validados por commitlint en hook; imperativo, cabecera
  ≤ 100 caracteres.
- **SemVer**. La versión de `package.json` se muestra en el pie del sitio.
  Release = versión + `CHANGELOG.md` + tag anotado `vX.Y.Z` + push
  `--follow-tags`.
- Nunca push directo a `main`: rama + PR, CI en verde, firma de commits al
  publicar (véase el incidente en `docs/AUDIT_2026-08-03.md`).

## Mapa de lectura

`docs/ARCHITECTURE.md` (referencia de planificación: capas, presupuestos,
reglas de evolución) · `CONTRIBUTING.md` (flujo y Definition of Done) ·
`docs/AUDIT_2026-08-03.md` (estado real y por qué) · `docs/BACKLOG.md` (qué
toca ahora; P0 bloquea producción) · `docs/CONTENT_GUIDE.md` (voz y
vocabulario permitido) · `docs/GAMIFICATION.md` · `docs/adr/` (decisiones;
cambiarlas = nuevo ADR).

## No hagas sin preguntar antes

Añadir dependencias · tocar `public/brand/` o `public/fonts/` · cambiar
`SCORING` o mecánicas · editar textos legales · retirar la banda «pendiente
de revisión legal» · publicar en producción con P0 abiertos.
