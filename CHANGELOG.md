# Changelog

Todas las novedades relevantes de numen.games. Formato basado en
[Keep a Changelog](https://keepachangelog.com/es/) y versionado
[SemVer](https://semver.org/lang/es/).

## [1.3.0] — 2026-08-04

Adopción integral del **canon Khepri v3.3.0**, que entra en el repo como
archivo maestro (`docs/brand/`, fiel byte a byte) con su contrato de
agente (§19). Cinco olas guiadas por un análisis de brechas de seis
lentes (79 hallazgos).

### Añadido

- **Registro píxel** (§2.4/§3.7): la escena del motor es siempre
  Nocturna (tokens fijados; el hueco sin telón se completa con Noche);
  **Pixelify Sans** autoalojada (12 KB, OFL) como voz de diálogo,
  hablantes y titulares de escena a múltiplos exactos 22/33/44 px; caja
  de diálogo §9.6 (Basalto, borde Noche); retratos a escala entera.
- **Catálogo de animación** (§10.1, ADR 0010): tecleo canónico a 22 ms
  con cursor `▌` Ámbar, barrido de señal en el separador binario, pulso
  legendario solo en la obtención, revelados 320 ms/8 px escalonados a
  80 ms; hoja del Nómada rehecha a 4 fotogramas/200 ms y ley de sprites
  §10.4.
- **Componentes §9**: cuatro tipos de botón canónicos sin versales, un
  primario por panel, tarjetas con elevación por escalón de superficie,
  píldora de estado, sombra única diurna solo en flotantes, espaciado en
  la escala de 4, etiquetas Mono 500 +0.10em, cifras tabulares.
- **Iconografía Phosphor** (§7): speaker-high/slash y circle-half
  inline en la cabecera (la Luna no es un icono).
- **Moneda de Ámbar** 12×12 generada con la gramática del canon para el
  HUD; tokens nuevos de §19.3 (duraciones con nombre, escala de espacio,
  radio completo, tinte diurno, velo, neutrales con nombre).
- Regla (h) del validador: `colorHablante` restringido al subconjunto de
  diálogo con AA verificada sobre la superficie real (test negativo).
- **La escena como aventura de los 80** (QA de dirección): diálogo a la
  izquierda con orla píxel de 9 cortes, escenario enmarcado a la
  derecha, retrato del hablante en marco con su nombre, beats que se
  ESCRIBEN progresivamente (`<escena-dialogo>`, clic completa). Retratos
  48×48 nuevos — Senet (reptiliano gamberro), **Vesper** el Deshilador
  (cyanita: piel azul, pelo blanco, gesto hosco — bautizado), el Nómada
  encapuchado — y **8 escenarios isométricos** fantástico-steampunk
  producidos con la gramática §2.4.1 y auto-QA renderizada; retratos
  deduplicados por página vía `<symbol>`/`<use>` (HTML 212 KB / 31 KB
  gzip).
- ADR 0010 (reconciliación del movimiento) y ADR 0011 (desviaciones por
  accesibilidad, propuestas de enmienda al canon §17).

### Cambiado

- Rareza con variantes diurnas de texto del canon (antes poco-común
  pintaba 1.7:1 sobre Arena); títulos de escena con velo §8.2 en vez de
  sombra; botón de salto del tecleo a táctil 44×44; marca píxel en tinta
  y a escala entera (nunca más Ámbar); hexes diurnos no canónicos
  sustituidos por alias del canon.

### Retirado

- `numen-px.svg` (redibujo del wordmark que §8.3 no ampara),
  `token.svg` (sustituido por la moneda), `portal-pulse` (ni catálogo ni
  sprite conforme), pausas dramáticas del tecleo (se proponen al canon),
  iconos a medida de la cabecera.

## [1.2.0] — 2026-08-04

### Añadido

- **Motor de escena** (ADR 0008 «el guion como fuente de verdad»): tres
  Content Collections (`personajes`, `escenarios`, `escenas`) con Zod,
  vocabulario cerrado de acciones escénicas, validador puro testeado
  (`escenas-validate.ts`) y renderizador con guarda de vacío — sin guion,
  la home es byte a byte la misma; con guion, las escenas aparecen sin
  tocar código.
- **Guion canónico de Numinia v0.6.0** (`docs/narrativa/guion-numinia.md`
  y `escenarios-numinia.md`): ocho escenas, personajes y escenarios en ES
  y EN volcados a las colecciones — el motor deja de esperar en vacío.
- **Elecciones y roles del guion** (ADR 0009): esquema y validador de
  elecciones, y render sin JS con ambos desenlaces legibles.
- **Parte gráfica del motor**: telón, estilos completos del vocabulario
  escénico y slot operativo en la home.
- **Sprite propio del Deshilador** (retira el provisional `quest.svg`);
  se suma a la revisión de diseño de sprites IA (P0-8).
- **Tesoros del Umbral**: dos enlaces de conversión (reserva y correo) sin
  red, sin widgets y operativos sin JS, con hallazgo _épico_
  `tesoro-umbral` (25 PTS). No se renderizan hasta que P0-1/P0-4 rellenen
  sus constantes en `i18n/ui.ts`; el máximo del HUD se deriva del DOM para
  no prometer tesoros inalcanzables.
- **Ciclo `walk` del Nómada**: novena y última animación del cupo (9/9),
  hoja de 8 fotogramas a 10 fps con `steps()` y `mask-image` sobre
  `currentColor`; reserva a `hop` donde no hay soporte. Tres poses de
  Senet (`neutral`, `señala`, `celebra`). Sprites IA **pendientes de
  revisión de diseño** (P0-8).
- Guarda anti-verde-falso para e2e (`scripts/check-e2e.sh`) con su test
  negativo, y prueba de paridad de la panorámica en los tres motores.
- Canon ADR 0007 **aceptada y aplicada**: `--turquesa-texto-oscuro` cumple
  contraste AA en tema Nocturno; axe a cero violaciones (cierra P0-7).

### Corregido

- Motor de reserva del scroll (ADR 0006): separadas lectura y escritura de
  geometría (adiós al reflujo síncrono por fotograma) y recálculo en
  `resize`/`orientationchange`.
- Playwright ejecuta ahora chromium, firefox y webkit; el ADR 0006 y
  `ARCHITECTURE.md` ya no afirman una verificación tri-motor que no
  existía.
- Mapa Octalysis y embudo narrativo documentados en `GAMIFICATION.md`.

## [1.1.1] — 2026-08-03

### Añadido

- `CLAUDE.md` en la raíz: contexto operativo permanente para agentes
  (proyecto, stack, canon, comandos, reglas duras y convenciones).
- Presupuesto de página de 1 MB forzado en CI
  (`resource-summary:total:size` en Lighthouse).

### Corregido

- Purgados los restos del efecto glitch, prohibido por el canon: spans en la
  historia (ES/EN), handlers en `init.ts`, regla y `@keyframes` en CSS y
  menciones en README/ADRs/guía de contenido. Quedan **8 animaciones** del
  cupo de nueve; la plaza vacante se documenta en `CLAUDE.md`.

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
