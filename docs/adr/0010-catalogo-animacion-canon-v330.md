# ADR 0010 — El cupo de animación se reconcilia con el catálogo del canon v3.3.0

- **Estado:** aceptada (2026-08-04)
- **Contexto:** el cupo local de 9 `@keyframes` (v1.2.0) es anterior al
  catálogo cerrado de §10.1 del canon Khepri v3.3.0 y a la ley de sprites
  de §10.4 (la animación de sprite es contenido del registro píxel, no
  interfaz: 2–4 fotogramas, cadencias 120/200/320 ms, sin tweening).
  Ambas listas decían «nueve» pero no eran las mismas nueve.

## Decisión: el inventario pasa a ser «catálogo §10.1 + sprites §10.4»

La regla deja de ser «9 keyframes cualesquiera» y pasa a ser: **toda
animación de interfaz es una pieza del catálogo §10.1 con su spec exacta,
y toda animación de sprite cumple §10.4**. Un `@keyframes` nuevo solo
puede implementar una pieza del catálogo aún no implementada.

### Mapa de reconciliación

| Repo (v1.2.0)         | Destino                                                                                                                                                                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `caret-blink`         | = **#08 cursor de bloque**: `▌` Ámbar, 1 s `steps(2)`                                                                                                                                                                                    |
| `hero-in`             | = **#02 revelado** (320 ms, 8 px) escalonado a 80 ms (**#09** parcial)                                                                                                                                                                   |
| `data-reveal`         | = **#02 revelado** (ya cumplía el patrón; spec numérica alineada)                                                                                                                                                                        |
| `walk`                | → **sprite §10.4**: hoja rehecha de 8→4 fotogramas a 200 ms (locomoción)                                                                                                                                                                 |
| `hop`                 | → **sprite §10.4**: alternancia de 2 poses a 200 ms                                                                                                                                                                                      |
| `spawn-out`           | → **#02 revelado** solo-opacidad (translate+scale eran tweening §10.4)                                                                                                                                                                   |
| `portal-pulse`        | **RETIRADA**: ni catálogo ni sprite conforme; si vuelve, será un sprite de 2 fotogramas dibujado por Creativo                                                                                                                            |
| `pts-rise`            | **EXTENSIÓN propuesta** (§17): feedback diegético de obtención de PTS, 900 ms; no existe en el catálogo — se eleva al canon con esta justificación                                                                                       |
| `thread` / `panorama` | **Fuera del ámbito del catálogo**: transformaciones ligadas 1:1 al scroll (scroll-driven), sin eje temporal propio. NO son parallax (una sola capa a velocidad 1:1). Documentadas aquí; retirarlas es decisión de diseño, no de este ADR |

### Piezas del catálogo añadidas

- **#01 tecleo**: cadencia canónica 22 ms/carácter lineal; se retiran la
  pausa de puntuación (130 ms) y la pausa entre bloques (140 ms) — el
  ritmo dramático se propone al canon como EXTENSIÓN aparte.
- **#03 barrido de señal**: banda Turquesa (α .25) recorriendo el único
  separador binario de la home, 8 s lineal. Máximo uno por vista.
- **#05 pulso legendario**: el halo del sello respira ×2 (2.4 s) SOLO en
  el momento de obtención (`.is-obtained`, clase que no persiste);
  en visitas posteriores el halo queda estático. El radio del pulso
  (24 px) es el doble del halo canónico con su mismo color [DERIVADO].

### Diferido (deuda registrada en BACKLOG)

- **#09 completo en el héroe**: tecleo del titular con `<type-writer>` +
  revelados a 80 ms tras terminar. Hoy el héroe tiene el escalonado a
  80 ms con revelado #02; el tecleo del titular exige coordinar el fin
  del tecleo con el inicio de los revelados (evento de `TypeWriter`).
- **#04 elevación** en hover de superficies: entra con la ola de
  componentes (§9.4).
- **#06 fase lunar** en el medidor de actos (secuencia real, §2.2):
  exige el glifo propio de fases (no `moon` de Phosphor, §7.2).

### Consecuencias

- `prefers-reduced-motion` y la guarda `.js` siguen aplicando a todo.
- CLAUDE.md debe reescribir su regla dura n.º 2 en estos términos
  (se hace en la ola de documentación de esta misma adopción).
