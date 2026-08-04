---
orden: 5
lang: en
acto: 2
fase: 5
funnel: intencion
escenario: en/plaza-activacion
beats:
  - hablante: sistema
    parlamento: >-
      The fair now has a minimal structure. It must produce a useful
      interaction.
  - hablante: sistema
    rol: anfitrion
    eleccion:
      id: activacion-anfitrion
      pregunta: Choose what needs to become visible.
      opciones:
        - etiqueta: A TREND
          consecuencia: Several signals form a trend.
        - etiqueta: A CONNECTION
          consecuencia: Two figures start a conversation.
        - etiqueta: A SHARED QUESTION
          consecuencia: A question opens a new route.
  - hablante: sistema
    rol: impulsor
    eleccion:
      id: activacion-impulsor
      pregunta: Choose how to contribute value.
      opciones:
        - etiqueta: OFFER KNOWLEDGE
          consecuencia: A need finds its answer.
        - etiqueta: SOLVE A NEED
          consecuencia: A need finds its answer.
        - etiqueta: REQUEST A RELEVANT INTRODUCTION
          consecuencia: Two figures start a conversation.
  - hablante: sistema
    rol: explorador
    eleccion:
      id: activacion-explorador
      pregunta: Choose how to take part.
      opciones:
        - etiqueta: FOLLOW AN AFFINITY
          consecuencia: Two figures start a conversation.
        - etiqueta: SHARE A QUESTION
          consecuencia: A question opens a new route.
        - etiqueta: CONTRIBUTE A CAPABILITY
          consecuencia: A need finds its answer.
  - hablante: en/deshilador
    parlamento: (loses presence)
    accion: { verbo: sale }
---

Idea: gamification is not about adding arbitrary prizes, but about
steering participation toward real goals. [Borrador — P0-5]
