# Arquitectura de numen.games

Referencia de planificación. No describe un ideal: describe lo construido y
las reglas para evolucionarlo. Detalle de cada decisión: `docs/adr/`.

**Principio rector:** web de contenido con una escena encima. Estático
primero, mejora progresiva siempre, presupuestos cerrados. La plataforma
(HTML/CSS/Web APIs) ya trae todo lo que esta web necesita.

## 0 · Política de librerías de cliente

**Runtime del navegador: cero librerías.** Ni Three.js, ni GSAP, ni
Lenis/Locomotive, ni React/Vue. Motivos, por orden:

- **No hay requisito que las pida.** La escena es píxel 2D (SVG del kit +
  CSS); el scroll lo mueve el doble motor (ADR 0006); el audio es síntesis
  Web Audio sin assets; el estado cabe en 200 líneas testeadas.
- **Presupuesto.** La home pesa ≈ 250 KB de 1 MB; solo Three.js añadiría
  ~170 KB gzip de runtime y triplicaría nuestro JavaScript.
- **Canon.** Khepri es materia píxel y tipografía; un canvas 3D es otro
  lenguaje visual y además opaco para lectores de pantalla.

**Three.js en concreto: NO.** Si algún día una pieza exige 3D real (p. ej.
un Khepri navegable), el camino es: ADR nuevo + isla `client:visible` con
carga diferida + partida de presupuesto propia + fallback 2D. Nunca en el
bundle base.

**Build-time: sí, con criterio.** Astro, Tailwind 4/Lightning, esbuild,
sharp, Vitest/Playwright viven en `devDependencies` y no viajan al
navegador.

## 1 · Las capas (de abajo arriba)

- **Contenido** — Content Collections + Zod (`src/content/story/{es,en}`,
  un `.md` por fase/camino/portal); strings y rutas en `src/i18n/ui.ts`. El
  equipo creativo edita sin tocar componentes (ADR 0004).
- **Presentación** — Astro 5 estático (ADR 0001). HTML semántico primero: la
  página completa se lee sin CSS ni JS. Componentes `.astro` sin estado.
- **Estilo** — una sola fuente de verdad: `src/styles/tokens.css` (canon
  Khepri v3.0.0) → Tailwind 4 `@theme` → Lightning CSS (prefijos y rebaje de
  sintaxis al target). Sin `tailwind.config`.
- **Movimiento** — cupo cerrado de 9 keyframes (9 en uso: lleno); todo tras `.js` +
  `prefers-reduced-motion` (ADR 0005); piezas de scroll con doble motor: CSS
  scroll-driven donde exista ⇄ `--thread-p`/`--pan-p` por JS (ADR 0006).
  Parallax y glitch: prohibidos.
- **Interactividad** — Web Components vanilla registrados en
  `src/scripts/init.ts`; la lógica es módulos puros testeables (`journey.ts`,
  `viewport.ts`) sin DOM.
- **Estado** — Nivel B (ADR 0002): `localStorage` con fallback en memoria;
  claves inventariadas en `/legal/cookies` (`numen.journey.v1`,
  `numen.theme`, `numen.audio`, `numen.cookies.ack`). Sin backend, sin
  cuentas.
- **Audio** — síntesis Web Audio (cero ficheros), desbloqueo por gesto,
  silenciador persistente.
- **Activos** — marcas `public/brand/` (siempre `currentColor`), sprites SVG
  tematizables `src/assets/pixel/`, Geist/Geist Mono `public/fonts/` (OFL).
  Nada se recolorea a mano.
- **i18n** — prefijo obligatorio `/es/` `/en/`, slugs localizados, hreflang
  desde el mismo mapa de rutas (ADR 0003).
- **Seguridad** — sin red en cliente; CSP y cabeceras en `public/_headers`;
  cadena de suministro: lockfile, `allowBuilds` explícito, Dependabot, firma
  de commits al publicar.
- **Calidad** — puertas locales (`check · lint · test · build`) = CI; e2e
  con axe en tres motores (chromium/firefox/webkit); Lighthouse con
  presupuesto de 1 MB como assertion.
- **Entrega** — `dist/` a CDN estático (Cloudflare Pages/Netlify), que lee
  `_headers`; sitemap i18n; versión visible en el pie.

## 2 · Dónde ocurre cada cosa

- **Build:** colecciones → HTML; Tailwind+Lightning → un CSS; esbuild → un
  JS (~13 KB); sprites y marcas inline donde tocan.
- **Runtime:** un script progresivo (viaje, elecciones, HUD, audio, motores
  de respaldo). Sin JS: lectura vertical íntegra, ambos desenlaces visibles.

## 3 · Presupuestos vigentes

| Presupuesto    | Límite          | Hoy                                     | Guardián             |
| -------------- | --------------- | --------------------------------------- | -------------------- |
| Peso home      | ≤ 1 MB          | ≈ 250 KB                                | Lighthouse CI        |
| Animaciones    | ≤ 9 keyframes   | 9 (lleno)                               | CLAUDE.md + revisión |
| Deps runtime   | 0               | 0                                       | política §0 + ADR    |
| Navegadores    | matriz ADR 0006 | chromium+firefox ✓ local · webkit en CI | e2e tri-motor        |
| Claves storage | inventariadas   | 4                                       | `/legal/cookies`     |

## 4 · Reglas de evolución (planificación)

- Nueva dependencia runtime → ADR + partida de presupuesto + este doc.
- Nueva animación → cupo lleno: retirar una existente **y** pasar por diseño.
- API fuera de la matriz → patrón doble motor o no entra.
- Página/sección nueva → DoD de `CONTRIBUTING.md` (ES+EN, sin JS, a11y).
- Estado multi-dispositivo (Nivel C) → backend ⇒ ADR mayor + RGPD.
- 3D/canvas → ver §0: isla diferida con ADR, jamás en el base.

## 5 · Mapa mínimo

```
src/content/story/    historia (ES/EN)      src/scripts/init.ts    arranque WC
src/i18n/ui.ts         rutas + strings       src/scripts/*.ts       lógica pura
src/styles/tokens.css  canon ejecutable      public/brand|fonts     kit oficial
docs/adr/              decisiones            CLAUDE.md              reglas duras
```
