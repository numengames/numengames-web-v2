# ADR 0011 — Desviaciones por accesibilidad al canon v3.3.0 (propuestas de enmienda)

- **Estado:** aceptada (2026-08-04)
- **Contexto:** el propio canon fija la precedencia (§19.1): accesibilidad
  y reglas duras por encima del canon, y pide señalar el conflicto y
  proponer la alternativa accesible. Este ADR es esa señal, consolidada.
  Toda desviación aspira a ascender al canon como EXTENSIÓN (§17).

## Desviaciones vigentes (todas verificadas con ratios o con axe)

1. **`--turquesa-texto-oscuro` `#1F9CAC`** (ADR 0007): no existe en
   §19.3, pero la Turquesa canónica no llega a 4.5:1 sobre
   Basalto/Bronce oscuro. Propuesta: `texto-sobre-oscuro.turquesa`.
2. **Foco Diurno `#016E7D`**: §5 exige `#018EA1` literal siempre; en
   claro se mantiene la variante de texto por margen de contraste.
3. **Primario de botón**: conserva `--interactive`/blanco (ADR 0007) en
   vez de hover `#02A4BA` / active `#017486` con blanco (2.9:1 y ~4:1).
   El hover es la elevación #04 del catálogo (brightness un paso).
4. **Verdemar como texto en Diurno**: `#A6DAD5` sobre Arena ≈ 1.3:1; el
   fantasma (hover) y el silencioso usan `--turquesa-texto-claro` en
   claro.
5. **Subconjunto de hablantes reducido a 5** (regla (h) del validador):
   el subconjunto de §3.7 está verificado sobre Noche, pero la caja real
   es Basalto (§9.6) y ahí Turquesa (4.43:1) y Ceniza (4.33:1) caen de
   AA. Quedan: Arena, Arena velada, Verdemar, Verde, Ámbar (+
   `interactive` vía ADR 0007). Grana ya estaba vetada por el canon.
6. **Separador binario en `ink-muted`**, no `linea.fuerte` (§6.1):
   verificado empíricamente — con `line-strong` axe falla en las 4 rutas
   × 2 motores (1.25:1 en Diurno). axe audita contraste también en
   elementos `aria-hidden`.
7. **Pausa dramática del tecleo retirada** (130/140 ms): el canon exige
   22 ms lineales. La pausa de puntuación se propone al canon como
   EXTENSIÓN expresiva; hasta entonces no se usa.
8. **Escenario dentro del marco a `cover`**: el arte del escenario escala
   fraccionalmente dentro de su cuadro (§5.1 pediría múltiplo entero +
   relleno Noche). Al ser rects vectoriales con `crispEdges` no hay
   desenfoque, pero puede haber «píxeles» desiguales. Pendiente del
   redibujo isométrico; los retratos, el caminante y la moneda SÍ
   escalan entero.
9. **Pixelify a 16 px en cuerpo de diálogo y nombres de retrato**
   (decisión de la persona, precedencia 1 de §19.1): fuera de los
   múltiplos 22/33/44 de §4.5. La interlínea se mantiene entera (24 px)
   para no generar subpíxel. Se propone al canon ampliar la escala del
   registro con un peldaño de lectura compacta.
10. **Orla píxel de 9 cortes** en caja de diálogo, marcos de retrato y
    cuadro de escenario (dirección de la persona): §9.6 pedía borde
    1 px Noche. La orla usa solo Bronce y Arena velada (Khepri-16).

## Consecuencias

- Cada desviación vive comentada junto al código que la aplica y aquí.
- Si el canon v3.4+ incorpora estas enmiendas, este ADR se cierra y los
  comentarios se retiran.
