# ADR 0009 — Elecciones y roles: evolución del vocabulario del guion

**Estado:** aceptada · 2026-08-04

## Contexto

El guion canónico (`docs/narrativa/guion-numinia.md`, v0.6.0) se apoya en
dos estructuras que el esquema del ADR 0008 no sabía expresar:

1. **Elecciones**: «uno o dos parlamentos breves; entre dos y tres
   opciones; una consecuencia visible» (mecánica general del guion).
2. **Roles**: Anfitrión / Impulsor / Explorador — una elección los asigna
   y «las estaciones siguientes conservan la misma estructura, pero
   adaptan ejemplos, beneficios y entregable final al rol elegido».

La migración exploratoria los representó como acotaciones de `sistema`:
fiel al texto, infiel a la estructura. Este ADR sigue el camino que el
propio contrato fija: «verbo nuevo = cambio de esquema + diseño».

## Decisión

El `beat` gana dos campos opcionales; el vocabulario sigue CERRADO:

```yaml
- hablante: es/senet # como siempre
  parlamento: ¿Qué has venido a proteger? # ahora OPCIONAL si hay eleccion
  rol: anfitrion # ← NUEVO: beat visible para ese rol
  eleccion: # ← NUEVO: elección diegética
    id: proposito # estable, para persistencia Nivel B
    opciones: # 2–4
      - etiqueta: QUIERO QUE EL ENCUENTRO DEJE VALOR Y MEMORIA
        consecuencia: El Nómada recibe el distintivo de Anfitrión.
        rol: anfitrion # solo en la elección de rol
```

- `rol` ∈ `anfitrion | impulsor | explorador` (enum cerrado).
- `eleccion.opciones[].rol` solo aparece en **la** elección de rol.

## Reglas nuevas del validador (se suman a a–d del ADR 0008)

- **(e)** ids de elección únicos por idioma; paridad ES/EN de ids **y** del
  número de opciones de cada elección.
- **(f)** exactamente una elección de rol por idioma (aquella cuyas
  opciones llevan `rol`): o todas sus opciones asignan rol o ninguna;
  cubre los tres roles sin repetir.
- **(g)** ningún beat con `rol` puede aparecer en una escena de `orden`
  anterior o igual a la que contiene la elección de rol — no se puede
  ramificar antes de elegir; y si hay beats con `rol`, la elección de rol
  debe existir.
- **(h)** todo beat dice algo: `parlamento`, `eleccion` o ambos.

## Presentación (mejora progresiva, reglas duras 3 y 5)

- **Sin JS**: todas las opciones y todas las consecuencias son visibles y
  legibles en orden, con su etiqueta; los beats de rol se muestran todos,
  precedidos del nombre del rol. Nada queda oculto tras la interacción.
- **Con JS** (fase siguiente, no incluida aquí): las elecciones se vuelven
  interactivas con el patrón existente (`aria-pressed`, anuncio por región
  viva, persistencia en `numen.journey.v1` — elección = 15 PTS del SCORING
  vigente, sin tocar `journey.ts`). El rol filtra los beats etiquetados.
- El distintivo del rol y el «indicador de estructura» del guion son
  presentación derivada del estado; no necesitan esquema propio.

## Fuera de alcance (y por qué)

- **Correo opcional del legado** (Estación 6): pasa por Legal antes de
  cualquier implementación — hoy no hay formularios ni red en cliente.
- **Interactividad JS de las elecciones**: mecánica nueva ⇒ pasa por
  `docs/GAMIFICATION.md` y revisión de diseño; el esquema ya la soporta.
- **Sprite propio del Deshilador**: pendiente de diseño; `quest.svg` es
  provisional declarado.

## Consecuencia

El guion v0.6.0 se puede migrar con su estructura real: elecciones como
elecciones, roles como roles. La próxima estructura narrativa que el
esquema no sepa decir seguirá este mismo camino: ADR + esquema + validador

- renderizador, nunca un apaño en el contenido.
