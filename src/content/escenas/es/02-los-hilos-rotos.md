---
orden: 2
lang: es
acto: 1
fase: 2
funnel: interes
escenario: es/hilos-rotos
beats:
  - hablante: es/deshilador
    parlamento: (aparece como interferencia y separa dos señales relacionadas)
    accion: { verbo: entra }
  - hablante: sistema
    parlamento: |-
      «Busco orientación sobre una nueva regulación».
      «Ayudo a equipos a comprender contextos jurídicos complejos».
  - hablante: es/deshilador
    parlamento: |-
      Una plaza llena de desconocidos
      es perfecta tal como está.
  - hablante: es/senet
    parlamento: No faltan personas.
    accion: { verbo: pose, pose: señala }
  - hablante: es/senet
    parlamento: |-
      Falta una estructura
      que haga visible la relación.
  - hablante: sistema
    eleccion:
      id: hilos
      opciones:
        - etiqueta: CONECTAR LAS SEÑALES
          consecuencia: >-
            Aparece una ruta entre ambas y aumenta el indicador de
            estructura de la feria.
        - etiqueta: DEJARLAS SEGUIR SU CAMINO
          consecuencia: >-
            Las señales se desvanecen. Senet muestra lo que se pierde y
            permite recuperar la conexión. No existe un estado de fracaso
            permanente.
---

Idea: Numen Games no inventa las oportunidades; diseña el sistema que
permite detectarlas y activarlas.
