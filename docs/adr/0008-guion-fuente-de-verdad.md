# ADR 0008 — El guion como fuente de verdad del motor de escena

**Estado:** aceptada · 2026-08-04

## Decisión

La web **renderiza lo que el guion declara**, no al revés. El guion vive en
tres Content Collections con esquema Zod (`src/content.config.ts`):

- **`personajes`** — el elenco: papel, color de hablante, sprite, poses,
  reglas de voz y límites de cada figura.
- **`escenarios`** — los lugares: bandas de color, elementos, luz y tramo
  de la panorámica que ocupa cada uno.
- **`escenas`** — la secuencia: acto, fase, etapa del funnel, escenario
  referenciado y beats (hablante + parlamento + acción opcional).

Cambiar la historia = **editar Markdown**. Ningún componente contiene
narrativa; el motor interpreta las entradas y nada más (continuación
natural del ADR 0004, que ya llevó la historia a Content Collections).

## Vocabulario de acciones cerrado por esquema

Las acciones escénicas son un `z.discriminatedUnion` sobre `verbo` con
exactamente seis formas: `entra` · `sale` · `pose(x)` · `camina-hasta(x)` ·
`luz(x)` · `pausa`. Cada rama es `.strict()`: una clave extra o un verbo
desconocido **rompen el build**.

Esto es deliberado: un verbo nuevo es un **cambio de esquema** (en
`content.config.ts` y en su espejo tipado de
`src/scripts/escenas-validate.ts`), no una extensión libre del guion. Así
la superficie que el motor debe saber renderizar queda acotada y
versionada, y el cupo de animación de CLAUDE.md (regla dura n.º 2) no
puede crecer por la puerta de atrás de la narrativa.

## Tokens del canon, nunca valores

`colorHablante`, `bandas` y `luz` validan contra un enum de **nombres de
token** extraído en build de `src/styles/tokens.css`
(`extraerTokensDeColor`). Un hex en el guion no compila: el canon Khepri
sigue siendo la única fuente de color (regla dura n.º 9).

## Validaciones cruzadas

Lo que Zod no puede ver entrada a entrada vive en
`validateEscenas(escenas, personajes, escenarios)`
(`src/scripts/escenas-validate.ts`, función pura sin `astro:content`,
testeada en Vitest): una única escena `funnel='accion'` y última por
`orden`, las cinco etapas del funnel presentes, toda pose declarada en su
personaje, y paridad ES/EN de ids en las tres colecciones.

## Estado actual: el guion aún no existe

`docs/narrativa/` está vacío y las tres colecciones **nacen vacías** (solo
`.gitkeep`); el sitio compila y `validateEscenas` pasa con listas vacías a
propósito. Cuando el guion llegue, se volcará 1:1 a estas colecciones sin
tocar esquemas — y si no encaja, lo que se negocia es el guion o un nuevo
ADR, nunca un apaño en los componentes.

## Regla de conflicto

**La técnica limita, la narrativa propone.** El guion puede pedir
cualquier cosa dentro del vocabulario; el esquema decide qué es
expresable. Y ambas se rinden ante `CLAUDE.md` y `docs/adr/`: ni una
escena justifica un `@keyframes` fuera de cupo, ni una limitación técnica
justifica saltarse el canon. Cambiar este contrato = nuevo ADR.
