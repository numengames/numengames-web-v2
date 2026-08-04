# Sistema de gamificación (Nivel B · canon Khepri)

## Principios innegociables

1. **Nunca bloquear contenido.** El juego añade capas; no hay muros.
2. **Diegético o fuera.** Los puntos (PTS), el inventario y la rareza existen
   porque la web _es_ una aventura clásica; miden hitos narrativos reales
   (fases, elecciones, hallazgos), nunca engagement vacío.
3. **Sin presión social.** Nada de rankings, comparaciones ni temporizadores.
4. **Reversible y transparente.** «Reiniciar el viaje» siempre visible;
   inventario de almacenamiento publicado en /legal/cookies.
5. **Degradación total.** Sin JS se lee todo; `prefers-reduced-motion`
   desactiva secuencias (aparición del Nómada incluida) sin perder estado.
6. **Accesible.** `aria-pressed` en elecciones, anuncios por región viva,
   hitos navegables por teclado, audio solo tras gesto y con silenciador
   persistente (`numen.audio`).

## Mecánicas en producción (v1.0.0)

| Mecánica                  | Detalle                                                                                                               | Persistencia        |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Progreso por fases        | 7 waypoints narrativos → carta de travesía (I·II·III navegables)                                                      | `numen.journey.v1`  |
| Puntuación PTS            | `SCORING = fase 10 · elección 15 · hallazgo 25`; HUD «PTS 040/120» y flotantes `+10`                                  | derivada del estado |
| Elección con consecuencia | Camino de Transformación (dos desenlaces; legibles ambos sin JS)                                                      | sí                  |
| Inventario con rareza     | Sello de la Grieta _poco común_ · máscara de Senet _raro_ · fragmento de Numinia _épico_ (recap final)                | derivada            |
| Secuencia de aparición    | «▶ Empezar»: el portal late y el Nómada cruza; visitas posteriores o reduced-motion → entrada directa (`has-spawned`) | sí                  |
| Panorámica del Nómada     | El caminante avanza izquierda→derecha con la travesía                                                                 | derivada            |
| Audio 8-bit               | Blips de UI vía Web Audio (cero assets), desbloqueo por gesto, botón silenciador en cabecera                          | `numen.audio`       |
| Huevo de pascua           | 5 toques al wordmark → sello de Numinia en el pie                                                                     | sí                  |
| Reinicio                  | Pie de página; limpia estado y anuncia por región viva                                                                | —                   |

## Mapa Octalysis (política operativa — enforcement)

Motores **permitidos** (white hat): significado épico (1), logro (2),
creatividad (3), propiedad (4) y curiosidad (7). Motores **vetados en
código y en copy**: escasez/urgencia (6) — contadores, «quedan N plazas» —
y pérdida/FOMO (8). Influencia social (5) **aplazada**: testimonios pasan
antes por Legal. Cualquier guion o mecánica que pida un motor vetado se
rechaza citando esta sección.

## Embudo narrativo (funnel)

Las escenas del motor (colecciones `escenas/`, ADR 0008) declaran su etapa:
`conciencia → interés → consideración → intención → acción`. El esquema
exige las cinco etapas presentes y una única escena de `acción` como
cierre. Medición: únicamente conversiones finales, hasta que la telemetría
sin cookies pase por Legal (P1).

## Mecánica pendiente de activación

| Mecánica          | Detalle                                                                                                                                                                                                         | Persistencia       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Tesoro del Umbral | Hallazgo _épico_ `tesoro-umbral` (25 PTS) al usar cualquiera de los dos enlaces de conversión; los enlaces no se renderizan hasta que P0-1 (buzón) y P0-4 (reserva) rellenen sus constantes en `src/i18n/ui.ts` | `numen.journey.v1` |

## Backlog de diseño (priorizar en `docs/BACKLOG.md`)

- **CTA del Umbral sensible a la elección** de Transformación (avanzar ≠
  esperar): única propuesta del kickoff aún sin implementar.
- **Eco en Conexión** (acción que solo se completa en conjunto) — evaluar
  valor vs. ruido antes de construir.
- **Telemetría sin cookies** del embudo narrativo (fase alcanzada, elección,
  reinicio) — pasa antes por Legal.

## Antipatrones que seguimos vetando

Puntos como cebo de engagement, insignias sin historia, rankings, presión
temporal, dark patterns de scroll. Si una mecánica no sirve a la historia y
la historia a la conversión, no entra.
