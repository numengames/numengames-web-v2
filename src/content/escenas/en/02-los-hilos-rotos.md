---
orden: 2
lang: en
acto: 1
fase: 2
funnel: interes
escenario: en/hilos-rotos
beats:
  - hablante: en/deshilador
    parlamento: (appears as interference and pulls two related signals apart)
    accion: { verbo: entra }
  - hablante: sistema
    parlamento: |-
      "I am looking for guidance on a new regulation."
      "I help teams understand complex legal contexts."
  - hablante: en/deshilador
    parlamento: |-
      A square full of strangers
      is perfect exactly as it is.
  - hablante: en/senet
    parlamento: People are not what is missing.
    accion: { verbo: pose, pose: señala }
  - hablante: en/senet
    parlamento: |-
      What is missing is a structure
      that makes the relation visible.
  - hablante: sistema
    eleccion:
      id: hilos
      opciones:
        - etiqueta: CONNECT THE SIGNALS
          consecuencia: >-
            A route appears between them and the fair's structure indicator
            grows.
        - etiqueta: LET THEM DRIFT APART
          consecuencia: >-
            The signals fade. Senet shows what is lost and allows the
            connection to be recovered. There is no permanent failure state.
---

Idea: Numen Games does not invent the opportunities; it designs the system
that makes them visible and actionable. [Borrador — P0-5]
