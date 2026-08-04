---
orden: 1
lang: en
acto: 1
fase: 1
funnel: conciencia
escenario: en/plaza-anochecer
beats:
  - hablante: en/nomada
    parlamento: (arrives shortly before closing time)
    accion: { verbo: entra }
  - hablante: en/senet
    parlamento: You have arrived before the closing.
    accion: { verbo: entra }
  - hablante: en/senet
    parlamento: |-
      There are many voices in this square.
      Few roads between them.
  - hablante: sistema
    eleccion:
      id: observar
      pregunta: The Nomad chooses what to observe.
      opciones:
        - etiqueta: LISTEN TO A CONVERSATION
          consecuencia: A conversation that will not continue.
        - etiqueta: EXAMINE THE NOTICE BOARD
          consecuencia: A need nobody has answered.
        - etiqueta: STUDY THE FAIR MAP
          consecuencia: Areas full of people, yet empty of connections.
---

Idea: an event can be full of activity and still lose most of its value.
[Borrador de traducción — revisión nativa P0-5]
