# Guía de contenido y voz

## Voz

Segunda persona, presente, frases cortas con silencios («…»). La home
**inicia**, no explica; las páginas internas explican con lenguaje de negocio
(leads, métricas, entregables). Prohibido en la home: "solutions",
"engagement", "ROI".

## Glosario canónico

| Término           | Uso                                                                   |
| ----------------- | --------------------------------------------------------------------- |
| Numinia           | El mundo. Solo en La Invocación y el huevo de pascua (segundo plano). |
| Travesía          | El recorrido del visitante por la home.                               |
| Caminos           | Transformación · Inmersión · Conexión.                                |
| Portales          | Las tres puertas a Experiencias (networking, leads, orientación).     |
| Oráculo           | La llamada de 30 min de contacto.                                     |
| Carta de travesía | El medidor de progreso con hitos I·II·III.                            |

## Editar la historia

Ficheros en `src/content/story/{es,en}/NN-nombre.md`. Frontmatter:

```yaml
lang: es # es | en
act: 2 # 1..3
phase: 3 # 0..6 (waypoint de progreso)
order: 3.1 # orden de render
kind: camino # fase | camino | portal
title: '…'
subtitle: '…' # opcional
choice: # solo caminos con decisión
  question: '…'
  options: [{ label: '…', outcome: '…' }, { label: '…', outcome: '…' }]
```

HTML permitido en el cuerpo: `class="beat"` (golpe en la voz mecanografiada,
Geist Mono), `class="invocation-name"` (nombre grande), `<span data-glitch>`
(grieta animada). Nada más sin pasar por diseño. Canon §4.2: la máquina habla
en mono; prohibidas las tipografías de fantasía.

## Reglas duras

- Todo texto nuevo nace en ES **y** EN (o issue de traducción abierta).
- Botones: verbo + resultado («Entrar», «Reservar conversación»).
- No prometer nada que Legal no haya visto (métricas, garantías).
