# Backlog priorizado

## P0 — Bloqueantes de publicación (v0.2)

| #   | Ítem                                                                                                                                                                                 | Dueño      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| 1   | Datos legales reales (LSSI + RGPD) y buzones `hola@`/`security@`                                                                                                                     | Legal      |
| 2   | Logo/wordmark oficial SVG + favicon + og.png definitivos                                                                                                                             | Creativo   |
| 3   | Copy literal «No somos / Sí somos» y equipo (nombres, roles, correos)                                                                                                                | Creativo   |
| 4   | CTA de conversión definitivo (correo real / formulario / agenda)                                                                                                                     | Producto   |
| 5   | Revisión nativa del inglés                                                                                                                                                           | Creativo   |
| 6   | Auditoría manual de accesibilidad (teclado + lector de pantalla)                                                                                                                     | Ingeniería |
| 7   | ~~Contraste AA: 3 fallos `color-contrast` en axe~~ **Resuelto 2026-08-04** vía ADR 0007 (aceptada): token nuevo + 2 usos corregidos + exclusión justificada del flotante transitorio | Ingeniería |
| 8   | Revisión humana de los sprites IA (ciclo `walk`, poses de Senet, sprite del Deshilador) antes de publicar: ritmo a 10 fps, gesto «señala», pérdida del tono medio en marcha          | Creativo   |

### P0-7 — Contraste AA (axe, WCAG 1.4.3) — RESUELTO

Detectado y resuelto el 2026-08-04 (ADR 0007 aceptada). Se conserva el
diagnóstico original como registro; los ratios de la tabla son los de
ANTES del arreglo.

| Elemento        | Color                      | Sobre                | Ratio       |
| --------------- | -------------------------- | -------------------- | ----------- |
| botón del aviso | `--interactive` (turquesa) | `--surface-raised`   | 4.43        |
| `.slot-n` (×2)  | `--ink-faint` `#8a7d72`    | `--surface-elevated` | 3.84        |
| `.bin-sep`      | `--line-strong` (trazo)    | superficie           | 1.51 / 1.54 |

- El botón es un **control interactivo**: sin exención posible. Su causa es
  un hueco del canon → propuesta en `docs/adr/0007-turquesa-texto-tema-oscuro.md`
  (pendiente del visto bueno de diseño; no aplicar antes).
- Los otros dos son decorativos con `aria-hidden` y podrían acogerse a la
  excepción de «texto incidental», pero axe no infiere esa intención. Decidir
  explícitamente: corregir el uso, corregir el token, o documentar la excepción.

## P1 — deudas de la adopción del canon v3.3.0 (2026-08-04)

- Redibujar el kit píxel a las rejillas canónicas 12/24/48 (§2.4.2): los
  personajes actuales son rejilla 16. Deuda aceptada al adoptar; la
  revisión humana de sprites (P0-8) debe juzgar ya con la gramática de
  §2.4.1 y la paleta Khepri-16.
- Momento orquestado completo en el héroe (#09): tecleo del titular con
  `<type-writer>` + revelados a 80 ms al terminar (ADR 0010).
- Fase lunar (#06) en el medidor de actos: glifo propio de fases (la Luna
  no es icono, §7.2).
- Incorporar `khepri-sprite-24.png` y `moneda-12.png` del kit cuando el
  cliente los entregue (hoy: khepri-px propio como excepción registrada y
  moneda generada en el repo).
- Telón de escena a escala entera con relleno Noche (§5.1) — hoy `cover`
  fraccional, desviación 8 del ADR 0011.

## P1 — v0.3

- ~~Ver fallar la prueba de paridad del ADR 0006~~ **Hecho (2026-08-04)**:
  motor de reserva desactivado por mutación → la prueba se puso roja en
  Firefox (que no soporta `animation-timeline` y usa la reserva) → motor
  restaurado → verde. Firefox verificado en local; **webkit queda para CI**
  (faltan dependencias de sistema en la máquina local). El principio queda
  como doctrina en `scripts/check-e2e.test.sh`.

- ~~Escribir `docs/narrativa/guion-numinia.md` (ES y EN)~~ **Hecho
  (2026-08-04)**: guion canónico v0.6.0 + `escenarios-numinia.md` volcados
  a las colecciones (8 escenas, personajes y escenarios en ES/EN); el motor
  de escena (ADR 0008) renderiza en la home con elecciones y roles
  (ADR 0009).
- Rellenar `UMBRAL_CALENDAR_URL` (P0-4) y `UMBRAL_CONTACT_EMAIL` (P0-1) en
  `src/i18n/ui.ts`: activan los enlaces-tesoro del Umbral y su hallazgo
  épico `tesoro-umbral` (ya implementados, no renderizan hasta entonces).
- Material audiovisual del camino de Inmersión (grabaciones reales).
- CTA del Umbral sensible a la elección de Transformación (la única mecánica
  propuesta aún no implementada tras el canon).
- Analítica sin cookies (Plausible/Umami) + eventos del embudo narrativo.
- Página de casos cuando haya permisos (ver LEGAL_CHECKLIST).
- og:image por página (ahora una global).

## P2 — Ideas en nevera

- Nivel C de gamificación (estado multi-dispositivo) → exigiría backend (ADR).
- Modo «lectura directa» que salta la narrativa (enlace desde el filtro).
- Versión imprimible/PDF del manifiesto.
