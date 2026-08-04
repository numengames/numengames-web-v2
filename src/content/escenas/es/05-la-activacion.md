---
orden: 5
lang: es
acto: 2
fase: 5
funnel: intencion
escenario: es/plaza-activacion
beats:
  - hablante: sistema
    parlamento: >-
      La feria ya tiene una estructura mínima. Ahora debe producir una
      interacción útil.
  - hablante: sistema
    rol: anfitrion
    eleccion:
      id: activacion-anfitrion
      pregunta: Elige qué necesita hacer visible.
      opciones:
        - etiqueta: UNA TENDENCIA
          consecuencia: Varias señales forman una tendencia.
        - etiqueta: UNA CONEXIÓN
          consecuencia: Dos figuras comienzan una conversación.
        - etiqueta: UNA PREGUNTA COMPARTIDA
          consecuencia: Una pregunta abre una nueva ruta.
  - hablante: sistema
    rol: impulsor
    eleccion:
      id: activacion-impulsor
      pregunta: Elige cómo aportar valor.
      opciones:
        - etiqueta: OFRECER CONOCIMIENTO
          consecuencia: Una necesidad encuentra respuesta.
        - etiqueta: RESOLVER UNA NECESIDAD
          consecuencia: Una necesidad encuentra respuesta.
        - etiqueta: SOLICITAR UNA INTRODUCCIÓN RELEVANTE
          consecuencia: Dos figuras comienzan una conversación.
  - hablante: sistema
    rol: explorador
    eleccion:
      id: activacion-explorador
      pregunta: Elige cómo participar.
      opciones:
        - etiqueta: SEGUIR UNA AFINIDAD
          consecuencia: Dos figuras comienzan una conversación.
        - etiqueta: COMPARTIR UNA PREGUNTA
          consecuencia: Una pregunta abre una nueva ruta.
        - etiqueta: APORTAR UNA CAPACIDAD
          consecuencia: Una necesidad encuentra respuesta.
  - hablante: es/deshilador
    parlamento: (pierde presencia)
    accion: { verbo: sale }
---

Idea: la gamificación no consiste en añadir premios arbitrarios, sino en
orientar la participación hacia objetivos reales.
