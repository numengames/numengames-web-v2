---
orden: 1
lang: es
acto: 1
fase: 1
funnel: conciencia
escenario: es/plaza-anochecer
beats:
  - hablante: es/nomada
    parlamento: (llega poco antes del cierre)
    accion: { verbo: entra }
  - hablante: es/senet
    parlamento: Has llegado antes del cierre.
    accion: { verbo: entra }
  - hablante: es/senet
    parlamento: |-
      Hay muchas voces en esta plaza.
      Pocos caminos entre ellas.
  - hablante: sistema
    eleccion:
      id: observar
      pregunta: El Nómada elige qué observar.
      opciones:
        - etiqueta: ESCUCHAR UNA CONVERSACIÓN
          consecuencia: Una conversación que no continuará.
        - etiqueta: EXAMINAR EL TABLÓN
          consecuencia: Una necesidad que nadie ha respondido.
        - etiqueta: MIRAR EL MAPA DE LA FERIA
          consecuencia: Zonas llenas de personas, pero sin conexiones.
---

Idea: un evento puede estar lleno de actividad y, aun así, perder gran
parte de su valor.
