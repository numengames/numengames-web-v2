---
sistema: Numen Games · Design System
nombre_clave: Khepri
version: 3.3.0
fecha: 2026-08-04
estado: canon
deriva_de: 2026_03_20-Numinia_Brand_and_Culture-v0.1.2
idioma_canonico: es-ES
formato_tokens: W3C Design Tokens (DTCG) + CSS Custom Properties
convenciones_normativas: RFC 2119 (DEBE / DEBERÍA / PUEDE)
direccion: Solarpunk 40 · Steampunk 40 · Cyberpunk 20
registro_pixel: Khepri-16 + Pixelify Sans + guía de producción 90s (herencia de aventuras gráficas)
tipografia: Geist + Geist Mono (vercel.com/font, SIL OFL 1.1)
iconografia: Phosphor Icons (phosphoricons.com, MIT)
licencia: CC0 1.0 Universal (Legal by Design) · marcas excluidas
revision: cada seis meses, junto al Brand & Culture
---

# Numen Games · Design System

**Nombre clave: «Khepri».**
Un único archivo maestro. Todo lo que se diseñe —web, presentaciones, propuestas, materiales de evento, activos digitales, interfaces de producto y entornos 3D— se deriva de aquí. La guía viva con todos los ejemplos renderizados es `index.html` (junto a `/assets/`).

Este documento **no inventa la identidad**. La ejecuta. La identidad está en `Brand & Culture Numinia v0.1.2`; lo que falta ahí para producir se añade aquí y se marca como extensión.

---

## 0. Cómo usar este documento

**Persona:** lee §1–§2 para el porqué; trabaja desde §13 (Recetas); vuelve a §3–§11 para valores concretos.
**Agente digital:** empieza por §19 (Contrato): precedencia, algoritmo, tokens JSON, checklist. No inventes valores fuera de §19.3.

### 0.1 Palabras normativas

**DEBE / NO DEBE** = requisito absoluto; incumplirlo invalida la pieza. **DEBERÍA / NO DEBERÍA** = recomendación fuerte; se incumple solo con justificación escrita. **PUEDE** = criterio propio.

### 0.2 Marcas de procedencia

**[CANON]** consta en el Brand & Culture o es decisión de dirección tomada; se cambia allí. **[DERIVADO]** consecuencia necesaria de algo CANON. **[EXTENSIÓN]** añadido aquí para poder producir; es lo que hay que validar.

### 0.3 Sobre los estándares

No existe un estándar universal de design systems. Existen: el formato de tokens **W3C DTCG** (estándar abierto real: `$value`, `$type`), los sistemas de referencia ajenos (Material, Carbon — se citan, no se cumplen) y **WCAG 2.2 AA** (norma con fuerza legal en la UE, EN 301 549 — obligatoria). Estrategia: prosa normativa + tablas + un bloque DTCG, los mismos valores tres veces. Un sistema solo-JSON no lo lee nadie; uno solo-prosa no lo aplica ninguna máquina.

---

## 1. Fundamento

### 1.1 De dónde viene todo [CANON]

Propósito: _Leveling up organizations to build better relationships._ Misión: _Build games to make work better._ Causa: Digital Humanism — _Humans are not the problem._ HXC: _Build organizations that elevate lives._ Emoción: Joy + Trust + Interest = Optimism & Love. Arquetipos: Mago (Sanador) · Cuidador · Explorador. Cierre: _Leave things better than we found them._

### 1.2 Los valores, traducidos a diseño [DERIVADO]

**Cosmic Harmony** → nada existe por decoración; si un recurso no codifica algo verdadero del contenido, se elimina.
**Equable** → la accesibilidad es equidad, no cumplimiento; AA es el suelo.
**Curiosity** → inferencia activa (referencia científica declarada): **minimizar la sorpresa donde el usuario actúa** (nada se mueve bajo el cursor) y **maximizar la exploración donde descubre** (revelación progresiva).
**Healthy Environments** → el material dura y pesa poco: presupuesto de rendimiento, formatos abiertos, soportes reutilizables, autoalojado antes que CDN.

### 1.3 Los tres pilares [CANON]

**Craft** — el arte como motor. **Learn** — los humanos juegan para aprender. **Remix** — cópialo y hazlo mejor → este sistema se publica bajo CC0 (§15).

---

## 2. Dirección creativa

### 2.1 La mezcla · 40 / 40 / 20 [CANON — decisión de dirección]

El _SolarSteamCyberPunk_ del Brand & Culture, con la dosis fijada:

| Hilo          | Dosis    | Qué es                                                                                       | Qué aporta al sistema                                                                                                                                                                                                                                  |
| ------------- | -------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Solarpunk** | **40 %** | El optimismo mediterráneo: tecnología al servicio de la vida, luz, comunidad, sostenibilidad | Arena, Verdemar y el Ámbar-sol; el modo Diurno entero; la serenidad compositiva; la sostenibilidad como requisito técnico (§1.2). El Nocturno es **su noche cálida de jardín** —negros marrones, arena a la luz de la luna—, no la noche ácida de neón |
| **Steampunk** | **40 %** | La máquina: bronce, mecanismo, medida, la II Revolución Industrial                           | Los neutrales bronce del Nocturno; Geist Mono; la retícula mecánica; el relieve de circuito (§6); los instrumentos en la iconografía                                                                                                                   |
| **Cyberpunk** | **20 %** | La señal: el destello que atraviesa                                                          | Coral y Turquesa como neón **dosificado**; la textura binaria; el tecleo de terminal (§10). Al 20 %, el cyber es acento, jamás ambiente                                                                                                                |

**Regla de mezcla.** La luz domina, la máquina estructura, la señal parpadea. **Test de dosis** (entrecerrando los ojos): ¿parece un jardín mediterráneo con maquinaria de bronce donde parpadea una señal? Correcto. ¿Parece Blade Runner? Sobra ciber. ¿Parece un catálogo de jardinería? Falta máquina.

**Khepri** —el escarabajo solar: creación, ciclo, renacimiento— atraviesa los tres hilos y pone el cierre de toda pieza.

### 2.2 El repertorio de firma [EXTENSIÓN]

Cuatro elementos, y no hay más; todo lo demás es tipografía, espacio y color. (1) **El ciclo lunar** como marcador de secuencia — la Luna es símbolo canónico y una fase es de verdad una secuencia; solo donde exista secuencia real. (2) **La textura binaria** `101001…→xxxxx…` como separador: señal que se convierte en sedimento. (3) **El relieve de circuito** (§6): la materia. (4) **Khepri** como marca de cierre: cierra, nunca abre.

### 2.3 Arquitectura de marca [EXTENSIÓN — validar]

`NUMEN GAMES` (la organización, esta identidad) → `NUMINIA` (el mundo narrativo propio) → `PROYECTOS DE CLIENTE` (sistemas a medida, p. ej. OutThink). **REGLA DURA:** un sistema de proyecto NO DEBE sustituir esta identidad; hereda paleta, tipografía y retícula, y añade encima su léxico e iconografía.

### 2.4 El registro píxel [CANON — decisión de dirección]

Cuando la narrativa lo pide, Numen habla en píxel: la herencia de **Monkey Island, Day of the Tentacle y La Abadía del Crimen** — las aventuras gráficas que enseñaron que se aprende jugando (_Learn_, hecho forma). No es un tema decorativo: es un **registro de renderizado** del nivel II, con su propia disciplina.

**Cuándo sí:** momentos de juego y lore, escenas narrativas de evento, contenido del mundo Numinia, logros e insignias, pantallas de carga de producto, piezas de nostalgia con propósito.
**Cuándo no:** comunicación corporativa, propuestas y documentación (nivel III), visualización de datos, y cualquier pieza donde el píxel sea disfraz y no narrativa.

**Reglas del registro:**

- **Se entra y se sale por completo.** Una escena es píxel o no lo es; densidades mezcladas, prohibidas. Un sprite PUEDE vivir como contenido enmarcado dentro de una pieza del sistema (una tarjeta, un logro), nunca fundido con vector o fotografía.
- **Paleta cerrada Khepri-16** (§3.7), con dominancia de neutrales ≥ 60 % de la superficie — el «mucho negro/gris» hecho regla medible.
- **Escalado solo entero** (×2, ×3, ×4, ×6, ×8) con `image-rendering: pixelated`; jamás fraccional, jamás suavizado.
- **Rejillas**: 24 px emblemas y personajes sencillos · 12 px objetos e insignias · 48 px escenas. Contorno de 1 px en Noche sobre fondos activos (la legibilidad SCUMM y nuestro velo son la misma idea).
- **Sprites sencillos**: silueta primero; sin antialias ni degradados; tramado solo a dos colores en damero y con moderación (herencia CPC de La Abadía); ciclos de animación de 2–4 fotogramas; luz coherente desde arriba-izquierda (el sol).
- **El diálogo colorea por hablante** con el subconjunto aprobado (§3.7) y hereda el **tecleo** (§10.1-01): el registro píxel es el hábitat natural de la bandera del sistema.
- **Sprite canónico de Khepri**: existe una única traducción píxel de la marca, definida en los activos (`assets/pixel/khepri-sprite-24.png`) y demostrada en la guía. Es la **excepción cerrada** a la regla de no redibujar (§8.3): nadie vuelve a pixelar el escarabajo; se usa ese.
- El registro debe seguir pasando el **test de dosis** (§2.1): el píxel cambia la resolución, no la mezcla.

#### 2.4.1 Gramática visual · legibilidad antes que detalle [EXTENSIÓN — validar]

La referencia de los años 90 no se reproduce como filtro nostálgico: se adopta su disciplina. El artista trabaja con pocos píxeles, pocos colores y decisiones visibles. Cada píxel DEBE pertenecer a una forma, una luz, un material o una acción; el ruido que no comunica se retira.

- **Silueta primero.** Personajes, objetos interactivos y emblemas DEBEN reconocerse en una masa de un solo color a escala nativa. Si dos elementos cumplen funciones distintas, sus siluetas NO DEBEN depender de la paleta para distinguirse.
- **Lectura por masas.** Toda figura principal se organiza en sombra, cuerpo y luz antes de añadir detalle. Los acentos llegan al final. El detalle que rompe la lectura a tamaño real se elimina aunque resulte atractivo ampliado.
- **Clúster, no confeti.** Los píxeles se agrupan en clústeres continuos. Un píxel aislado solo PUEDE existir como brillo especular, estrella, partícula funcional o rasgo facial imprescindible; nunca como textura indiscriminada.
- **Escalones deliberados.** Las diagonales y curvas mantienen un ritmo regular de píxeles. Dientes accidentales, dobles contornos y cambios arbitrarios de grosor se corrigen a escala ×1.
- **Contorno selectivo.** Noche (`#14110F`) separa la silueta del fondo activo; dentro de la figura, las divisiones se resuelven con sombras de la propia rampa. Un contorno negro uniforme alrededor de todo aplana el volumen y NO DEBERÍA usarse salvo en sprites muy pequeños.
- **Luz única.** La fuente principal viene de arriba-izquierda, como ya fija el registro. Cada plano, sombra proyectada, brillo metálico y cambio de material DEBE obedecerla. No hay _pillow shading_ —luz centrada que rodea la forma— ni reflejos sin fuente.
- **Carácter por proporción.** Cabeza, torso, herramientas y gesto se exageran solo para mejorar la lectura; no para imitar una franquicia concreta. Se hereda la economía narrativa de la aventura gráfica, no sus diseños propietarios.

#### 2.4.2 Escalas de trabajo y consistencia [EXTENSIÓN — validar]

| Familia                 | Rejilla canónica | Se decide primero                                      | Se comprueba a ×1                                          |
| ----------------------- | ---------------: | ------------------------------------------------------ | ---------------------------------------------------------- |
| **Objeto / insignia**   |       `12×12 px` | silueta, orientación, punto de interacción             | que el objeto no se confunda con otro del mismo inventario |
| **Personaje / emblema** |       `24×24 px` | pose, eje de equilibrio, herramienta o rasgo dominante | que acción y dirección se lean sin animación               |
| **Módulo de escena**    |       `48×48 px` | profundidad, entrada/salida, foco y masa de luz        | que el foco siga visible sin zoom                          |

- Se dibuja y corrige a **×1**; ×2, ×3, ×4, ×6 y ×8 sirven para inspección y presentación, no para decidir el píxel.
- La escala de un activo se fija al iniciar. NO DEBE dibujarse grande para reducirlo después ni rotarse con interpolación. Una nueva escala exige redibujo sobre su rejilla.
- Todos los puntos de anclaje —pies, centro de objeto, origen de herramienta y caja de diálogo— usan coordenadas enteras y se mantienen entre fotogramas.
- El _hitbox_ y la zona táctil pertenecen a la interacción, no al contorno visual: PUEDE ser mayor que el sprite para cumplir los `44×44 px` de accesibilidad sin agrandar el dibujo.

#### 2.4.3 Profundidad y composición de escena [EXTENSIÓN — validar]

La profundidad se construye con **solapamiento, escala, contraste y densidad de detalle**; no con desenfoque. El fondo usa más neutrales, menos contraste interno y clústeres mayores. El primer plano PUEDE tener bordes más oscuros y detalle mayor, pero NO DEBE tapar acciones necesarias.

1. **Fondo:** establece lugar y clima; evita acentos salvo una señal narrativa.
2. **Plano de juego:** concentra personajes, objetos interactivos y rutas. Es la zona con mayor claridad de silueta.
3. **Primer plano:** enmarca o da profundidad; nunca compite con el objetivo.
4. **Foco:** un único punto dominante por escena. Ámbar señala valor o descubrimiento; Turquesa, interacción; Coral, tiempo real.

Un objeto interactivo DEBE poder localizarse por al menos dos vías: silueta + posición, nombre + símbolo, o contraste + respuesta de foco. Nunca solo por color.

#### 2.4.4 Matriz visual · cómo sí / cómo no [EXTENSIÓN — validar]

| Cómo sí                                                            | Cómo no                                                    |
| ------------------------------------------------------------------ | ---------------------------------------------------------- |
| Dibujar la silueta y probarla sobre Noche y Basalto                | Añadir textura antes de resolver la forma                  |
| Compartir colores entre materiales para cohesionar la escena       | Crear una rampa nueva para cada objeto                     |
| Reservar los píxeles sueltos para brillos o partículas funcionales | Salpicar ruido para que «parezca retro»                    |
| Exagerar gesto, herramienta o dirección para leer a ×1             | Confiar en detalles que solo se ven ampliados              |
| Mantener el mismo origen y volumen entre fotogramas                | Hacer que el personaje tiemble por cambios de contorno     |
| Usar la nostalgia como gramática de producción                     | Copiar composiciones, personajes o interfaces propietarias |

---

## 3. Color

### 3.1 Paleta canónica [CANON]

| Hex       | Nombre       | Hilo  | Papel                                        |
| --------- | ------------ | ----- | -------------------------------------------- |
| `#A6DAD5` | **Verdemar** | Solar | Confirmación, calma, tintes de superficie    |
| `#018EA1` | **Turquesa** | Cyber | **Primario de acción e interacción**         |
| `#EFA517` | **Ámbar**    | Solar | Énfasis, valor, logro; el sol de Khepri      |
| `#F9EBDC` | **Arena**    | Solar | Neutral principal                            |
| `#F35059` | **Coral**    | Cyber | Aviso, tiempo real; destello, nunca ambiente |
| `#D33440` | **Grana**    | —     | Crítico, gravedad                            |

### 3.2 Neutrales [EXTENSIÓN]

**Nocturno** (pantalla, por defecto): fondo `#14110F` Noche · superficie `#1E1A17` Basalto · elevada `#292420` Bronce oscuro · líneas `#241F1B` / `#3A332D` · texto `#F9EBDC` (16.1:1) / `#C4B5A6` (9.6:1) / `#8A7D72` Ceniza (4.7:1).
**Diurno** (impreso, documento largo): papel `#F9EBDC` · superficie `#FDF6EE` · tinte `#E4F2F0` · línea `#E2D3C2` · tinta `#14110F` (15.8:1) / `#4A423B` (8.6:1) / `#6E6259` (5.1:1).

### 3.3 Variantes de texto sobre claro [DERIVADO]

Los canónicos son colores de _mood_; sobre Arena, como texto, se usa la variante: Turquesa→`#016E7D` (5.1:1) · Grana→`#B02330` (5.8:1) · Ámbar→`#7A5100` (6.0:1). Coral y Verdemar no tienen variante: sobre claro son solo relleno.

### 3.4 Semántica y reglas [DERIVADO]

Interactivo→Turquesa · Éxito→Verdemar · Énfasis/logro→Ámbar · Aviso/tiempo real→Coral · Error→Grana. Máximo **tres** colores por composición contando el neutral (las capas de datos §3.5–3.6 no cuentan: son codificación). **Coral y Grana no conviven.** El Ámbar es el sol, no el cielo: enfatiza, no cubre. Nada significa solo por color. Texto 4.5:1; grande y componentes 3:1.

### 3.5 Paletas categóricas de proyecto [DERIVADO]

Primero los seis canónicos; después variantes de luminosidad; nunca hues ajenos. Toda categoría lleva **nombre + símbolo + color**, los tres siempre.

### 3.6 Escala de rareza [CANON — decisión de dirección]

Capa categórica para juego y producto (objetos, recompensas, Cartas de Navegación, activos digitales). Convención MMO que cualquier jugador reconoce sin manual, afinada a esta paleta y verificada:

| Rareza         | Nocturno  | vs Noche | Texto en Diurno | vs Arena | Coherencia                                             |
| -------------- | --------- | -------- | --------------- | -------- | ------------------------------------------------------ |
| **Pobre**      | `#F9EBDC` | 16.1     | `#6E6259`       | 5.1      | = Arena: lo pobre es el papel                          |
| **Común**      | `#8A7D72` | 4.7      | `#5A4F45`       | 6.8      | = Ceniza, la neutral existente                         |
| **Poco común** | `#8FC46B` | 9.2      | `#356C19`       | 5.4      | Verde cálido, hermano de Verdemar                      |
| **Raro**       | `#5D9BD6` | 6.4      | `#2E6BB0`       | 4.7      | Azul templado, distinto del Turquesa interactivo       |
| **Épico**      | `#A98BE0` | 6.7      | `#6B44B8`       | 5.7      | Morado suavizado al mundo cálido                       |
| **Legendario** | `#EFA517` | 9.0      | `#7A5100`       | 6.0      | **= Ámbar**: lo legendario y el logro son el mismo sol |

Reglas: escala completa y en orden, sin peldaños inventados. **Tratamiento progresivo además del color**: pobre/común borde `linea.tenue`; poco común/raro borde de su color al 40 %; épico borde pleno; legendario borde pleno + halo `0 0 12px rgba(239,165,23,.25)` — **el único glow del sistema**. Nombre escrito en `type.etiqueta` la primera vez por vista. Vive en producto y juego; NUNCA en comunicación corporativa: un precio no es épico y un plazo no es legendario.

### 3.7 Paleta Khepri-16 · el índice del registro píxel [CANON — decisión de dirección]

Dieciséis colores, **cero hexes nuevos**: siete neutrales, los seis de marca y tres sombras ya definidas, más el verde de rareza. Todo sprite y toda escena píxel DEBE limitarse a este índice.

| Nº  | Hex       | Nombre            | Origen                | Papel en píxel                   |
| --- | --------- | ----------------- | --------------------- | -------------------------------- |
| 01  | `#14110F` | Noche             | nocturno.fondo-base   | Fondo, contorno de sprite        |
| 02  | `#1E1A17` | Basalto           | nocturno.superficie   | Sombra profunda                  |
| 03  | `#292420` | Bronce oscuro     | nocturno.elevada      | Sombra                           |
| 04  | `#3A332D` | Bronce            | nocturno.linea-fuerte | Sombra media, metal              |
| 05  | `#8A7D72` | Ceniza            | nocturno.terciario    | Gris de trabajo                  |
| 06  | `#C4B5A6` | Arena velada      | nocturno.secundario   | Luz media                        |
| 07  | `#F9EBDC` | Arena             | marca                 | Luz, brillo, sprite base         |
| 08  | `#A6DAD5` | Verdemar          | marca                 | Acento solar                     |
| 09  | `#018EA1` | Turquesa          | marca                 | Acento cyber                     |
| 10  | `#016E7D` | Turquesa profunda | texto-sobre-claro     | Sombra de 09                     |
| 11  | `#EFA517` | Ámbar             | marca                 | Oro, logro, sol                  |
| 12  | `#7A5100` | Ámbar tostado     | texto-sobre-claro     | Sombra de 11                     |
| 13  | `#F35059` | Coral             | marca                 | Señal viva                       |
| 14  | `#D33440` | Grana             | marca                 | Rojo profundo — **solo relleno** |
| 15  | `#B02330` | Grana profunda    | texto-sobre-claro     | Sombra de 14                     |
| 16  | `#8FC46B` | Verde             | rareza.poco-comun     | Naturaleza, el jardín solarpunk  |

**Dominancia:** ≥ 60 % de la superficie en los neutrales 01–07. **Subconjunto de diálogo** (texto píxel sobre Noche, ≥ 4.5:1 verificado): Arena 16.1 · Verdemar 12.2 · Arena velada 9.4 · Verde 9.2 · Ámbar 9.0 · Coral 5.5 · Turquesa 4.8 · Ceniza 4.7. **Grana queda fuera del diálogo** (3.9:1): relleno sí, texto jamás.

#### 3.7.1 Rampas funcionales [EXTENSIÓN — validar]

La paleta es única, pero se trabaja por **rampas compartidas**. Una rampa no añade colores: ordena los existentes para que materiales distintos parezcan pertenecer al mismo mundo.

| Rampa                | Colores disponibles                                                      | Uso principal                                                                    |
| -------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| **Neutral mecánica** | Noche · Basalto · Bronce oscuro · Bronce · Ceniza · Arena velada · Arena | estructura, piedra, metal, ropa, volumen general                                 |
| **Solar**            | Ámbar tostado · Ámbar · Arena                                            | sol, recompensa, latón iluminado, punto de valor                                 |
| **Señal fría**       | Turquesa profunda · Turquesa · Verdemar                                  | interacción, energía, vidrio, tecnología al servicio de la vida                  |
| **Señal cálida**     | Grana profunda · Grana · Coral                                           | daño, alarma y tiempo real; Coral y Grana siguen sin convivir en una composición |
| **Jardín**           | Verde · Verdemar · Arena                                                 | vegetación y materia viva                                                        |

Cada material DEBERÍA resolverse con **2–4 colores** de una o dos rampas. Compartir una sombra o una luz entre materiales cohesiona la escena y conserva el carácter limitado de los gráficos de los 90.

#### 3.7.2 Clústeres, tramado y transiciones [EXTENSIÓN — validar]

- El volumen se construye primero con áreas planas. El tramado NO sustituye una rampa mal elegida.
- Solo se permite el damero de **dos colores adyacentes de una misma rampa**, como ya fija §2.4. Se usa para transición de material, niebla o superficie amplia; nunca para «crear» un color de marca nuevo.
- NO se trama el contorno exterior, la tipografía, los ojos, los iconos de inventario ni los objetos que deban encontrarse rápido.
- El damero mantiene un patrón estable. Cambiar el patrón sin razón produce ruido y parpadeo al animar.
- Las bandas de color visibles son válidas y preferibles a un degradado suavizado. No se aplica _blur_, antialias ni transparencia intermedia para esconderlas.

#### 3.7.3 Cambio de paleta [EXTENSIÓN — validar]

La rotación o sustitución de índices —recurso clásico para agua, luz y señales— PUEDE utilizarse como optimización, pero **no crea una décima animación**. Solo implementa una animación ya autorizada: barrido de señal (§10.1-03), fase de progreso (§10.1-06) o pulso legendario (§10.1-05). Mantiene geometría y contraste, respeta `prefers-reduced-motion` y no altera el color del texto de lectura.

---

## 4. Tipografía

### 4.1 La familia [CANON]

**Geist** y **Geist Mono** — la fuente de Vercel ([vercel.com/font](https://vercel.com/font)) — en toda la organización. Simplicidad, minimalismo, velocidad; herencia suiza (así la declara el Brand & Culture). SIL OFL 1.1; cobertura latina completa. Fallbacks: `'Inter','Aptos','Segoe UI',Arial,sans-serif` / `'Consolas','Courier New',monospace`.

**Distribución.** DEBE autoalojarse en producción: variable woff2 (`Geist-Variable.woff2` 56 KB, `GeistMono-Variable.woff2` 58 KB, en `/assets/fonts/` con su licencia), `font-display: swap`. Origen: paquete npm `geist`. CDN solo para prototipos.

### 4.2 El contraste sans / mono [DERIVADO]

**Sans para lo que se afirma, Mono para lo que se mide.** Titulares, cuerpo e interfaz en Sans; cifras, coordenadas, etiquetas, código y lore técnico en Mono. El monoespaciado _es_ la máquina: resuelve el steampunk sin tipografías temáticas.

### 4.3 Escala [EXTENSIÓN]

Escala 1.200, base 16 px; pt para lienzo 1920×1080: `display.xl` 4.300rem/50pt · `display.l` 3.583/42 · `display.m` 2.986/34 · `titulo.l` 2.488/28 · `titulo.m` 2.074/24 · `titulo.s` 1.728/20 · `cuerpo.l` 1.440/17 · `cuerpo.m` 1/14 · `cuerpo.s` 0.875/12 · `etiqueta` 0.750/11 (Mono 500, versales, tracking `+0.10em`) · `dato.xl` 2.986 Mono 500 · `dato.m` 1 Mono 400. Pesos display 500, títulos 600; tracking display `-0.03/-0.02em`.

### 4.4 Composición

Interlínea 1.1 display / 1.55 cuerpo / 1.35 datos. Medida 60–75 caracteres, máx. 90. Sentence case salvo etiquetas. Énfasis con peso 600 o Ámbar; cursiva solo citas y lore. Cifras siempre Mono tabular. Un nivel de display por pieza. Viudas prohibidas en titulares.

### 4.5 Tipografía píxel [CANON — decisión de dirección]

En el registro píxel, la voz de display y diálogo es **Pixelify Sans** (Stefie Justprince, SIL OFL 1.1, Google Fonts) — proporcional y de caja baja amable, lo más cercano con licencia libre al espíritu de los diálogos SCUMM. Las fuentes originales de Monkey Island, DOTT y La Abadía son **propietarias**: se citan como herencia, no se usan ni se imitan píxel a píxel.

Reglas: autoalojada (`PixelifySans-Variable.woff2`, 22 KB, con su OFL en `/assets/fonts/`); tamaños en **múltiplos exactos** de su rejilla (22, 33, 44 px…), sin subpíxel; solo para diálogo, titulares de escena y HUD — **el cuerpo largo sigue siendo Geist** incluso dentro del registro; el texto de diálogo lleva contorno de 1 px en Noche sobre escenas activas y colorea por hablante (§3.7); nunca en nivel III ni en Diurno impreso.

#### 4.5.1 Composición del texto en escena [EXTENSIÓN — validar]

- Pixelify Sans se renderiza sin falso bold, falso italic, contorno suavizado ni transformaciones CSS. El peso se elige en la fuente; no se simula.
- El diálogo se presenta sobre una superficie sólida `nocturno.fondo-superficie` o `fondo-elevada`, con borde Noche cuando la escena permanece visible. Si se superpone directamente a la imagen, aplica el velo canónico antes del texto.
- El nombre de hablante usa Pixelify y el color aprobado; el cuerpo breve PUEDE usar Pixelify. Explicaciones, ayuda, accesibilidad y texto largo pasan a Geist para conservar legibilidad.
- Las líneas NO DEBEN forzarse con espacios. Los saltos se deciden por unidad de sentido y se prueban en el ancho mínimo de la interfaz.
- El cursor de bloque acompaña al tecleo y se retira al terminar. No se deja parpadeando junto a texto ya finalizado.
- El texto se compone sobre coordenadas enteras. Escala, `line-height`, traslación y caja NO DEBEN producir medias posiciones de píxel.

---

## 5. Espacio, retícula, forma

**Espaciado** base 4 px: `4·8·12·16·24·32·48·64·96·128` (`space.100–1000`); todo hueco DEBE ser de la escala.
**Retículas**: web ≤1280 / 12 col / margen 64 / medianil 24; tablet 8/40/24; móvil 4/20/16; diapositiva 1920×1080 / 12 / 120 / 32; A4 12 / 20 mm / 5 mm. Baseline 8 (4 mm impreso). Ritmo: secciones `s900` web · `s800` deck; bloques `s700`; titular→cuerpo `s400`; tarjeta `s500`.
**Forma**: cantos rectos en contenido; `6px` solo en controles y marcos de icono; círculo solo en marcadores y pegatinas. Bordes 1 px.
**Elevación**: en Nocturno sin sombras — escalón de superficie + hairline (`base→superficie→elevada`); única excepción el halo legendario. En Diurno una sola sombra `0 1px 2px rgba(20,17,15,.08), 0 8px 24px rgba(20,17,15,.06)`.
**Foco**: `outline: 2px solid #018EA1; offset 2px`, visible siempre, sin animación. No negociable.

### 5.1 Retícula interna del registro píxel [EXTENSIÓN — validar]

La retícula web organiza la página; la retícula píxel organiza el contenido dentro de la escena. No se mezclan.

- Posición, escala, recorte y origen de cada sprite usan números enteros. `translate`, zoom de cámara y desplazamiento que generen subpíxel están prohibidos.
- Cuando el viewport no admite una escala entera, la escena reduce al múltiplo inferior y completa el espacio restante con Noche. No se estira para llenar.
- El filtrado es `nearest-neighbor`; en web, `image-rendering: pixelated`. Se desactivan suavizado y mipmaps cuando el motor pueda alterar el píxel a escala de juego.
- Todos los fotogramas de una animación comparten celda, origen y caja de ocupación. El cambio de pose ocurre dentro de la celda, no moviendo accidentalmente el lienzo.
- El HUD y la caja de diálogo PUEDE pertenecer al registro píxel; navegación, formularios, ayudas extensas y controles del producto siguen el sistema vectorial de Khepri. La frontera entre ambos registros DEBE ser visible.
- La prueba se realiza en tres vistas: ×1 para decisión, una escala entera de presentación y el viewport mínimo soportado. Si falla en ×1, no se corrige ampliando.

---

## 6. Materia · texturas [CANON — decisión de dirección]

Dos texturas, los dos estados de la máquina: la señal (lo que fluye) y el circuito (por donde fluye).

### 6.1 La señal — binaria

`101001010010…` degradando a `xxxxxx…`, Geist Mono `cuerpo.s`, color `linea.fuerte`, tracking `.15em`. Es texto real, no imagen. Uso: separador de sección.

### 6.2 El circuito — relieve

Derivado del **normal map canónico** (`textura-circuito-normal.png`, 4096², panel greeble: la II Revolución Industrial encontrándose con lo digital, literal). Derivados entregados:

| Activo                              | Formato         | Peso   | Uso                                                            |
| ----------------------------------- | --------------- | ------ | -------------------------------------------------------------- |
| `textura-circuito-normal.png`       | PNG 4096²       | 9.5 MB | Material 3D (canal normal PBR, Three.js — el stack de Numinia) |
| `textura-relieve-nocturno-768.webp` | WebP 768²       | 14 KB  | **CSS**: fondos Nocturno, horneado al 5.5 %                    |
| `textura-relieve-nocturno.png`      | PNG 1536²       | 683 KB | Alta calidad: portadas, impresión de pantalla, OG              |
| `textura-relieve-alpha.webp`        | WebP 1536² RGBA | 695 KB | Líneas Arena sobre transparente, para hornear                  |

```css
.hero {
  background: var(--fondo-base) url('textura-relieve-nocturno-768.webp') center/cover;
}
```

**Dónde sí:** fondo de hero Nocturno, portadas de deck, OG images, bandas separadoras anchas, materiales 3D.
**Dónde no:** en Diurno (el papel es papel); en tarjetas, modales y toda superficie elevada (van lisas); detrás de lectura larga; por encima del **6 %** de visibilidad; como relleno de botones o iconos; en `repeat` directo (**no tesela** — verificado; usar `cover` o espejar).
La textura NO DEBE bajar el contraste efectivo del texto de AA; el horneado entregado mantiene ≥15:1 contra Arena.

---

## 7. Iconografía · Phosphor [CANON — decisión de dirección]

Sistema único: **[Phosphor Icons](https://phosphoricons.com)** — Helena Zhang y Tobias Fried, MIT, ~1.500 glifos × 6 pesos, rejilla 256, disponible como SVG, fuente web, React, Vue y Figma. Encaja porque su trazo geométrico de terminación redondeada es la misma construcción de los wordmarks, y porque seis pesos permiten una **regla** en lugar de una elección estética por icono.

### 7.1 Pesos

`regular` **por defecto** (16–40 px) · `fill` estado activo o alcanzado · `bold` en < 16 px · `light` ilustrativo en ≥ 48 px · **`thin` prohibido** (desaparece sobre Noche) · **`duotone` prohibido** (rompe la disciplina plana).

### 7.2 Uso

**Sí:** acción, objeto y navegación, con etiqueta de texto en el primer uso por pieza; un concepto = un icono en todo el sistema; heredan `currentColor` y solo toman acento cuando el texto adyacente lo toma.
**No:** como viñetas decorativas; mezclar pesos en una misma fila de interfaz; recolorearlos fuera del sistema; usarlos sin significado.
Icono a medida solo si Phosphor no cubre el concepto; se dibuja en su rejilla y se propone aquí como extensión. **Khepri y la Luna no son iconos: son marcas** — las fases del marcador de secuencia se construyen como glifo geométrico propio, no con `moon` de Phosphor.

### 7.3 Implementación

En producción, **subconjunto autoalojado** (SVG inline o sprite), como hace la propia guía `index.html`. Para prototipos: `@phosphor-icons/web` en npm/unpkg. Fuente de los SVG oficiales: `github.com/phosphor-icons/core` (`assets/{peso}/{nombre}[-{peso}].svg`).

---

## 8. Marca y activos [CANON]

### 8.1 Inventario (todos normalizados a `fill="currentColor"`, en `/assets/`)

| Archivo                             | Qué es                         | viewBox          | Uso canónico                                        |
| ----------------------------------- | ------------------------------ | ---------------- | --------------------------------------------------- |
| `Khepri_Logo.svg`                   | Isotipo: el escarabajo         | 75.44×75.53      | Cierre, favicon, avatar, sello                      |
| `Khepri_NG_Logo.svg`                | Isotipo + NG                   | 75.44×75.53      | Compacto con atribución                             |
| `NG_Logo.svg`                       | Monograma                      | 113.37×50.29     | < 120 px de ancho                                   |
| `Numen_Games_Horizontal_Word.svg`   | Wordmark horizontal            | 382.79×28.09     | **Firma principal**                                 |
| `Numen_Games_Vertical_Word.svg`     | Wordmark apilado               | 180.74×73.25     | Formatos cuadrados/verticales                       |
| `Numen_Word.svg`                    | «numen»                        | 180.74×28.09     | Cuando «games» es evidente                          |
| `Numinia_Word.svg`                  | El mundo                       | 194.25×28.01     | **Solo** piezas de Numinia                          |
| `pixel/khepri-sprite-24.png`        | Sprite canónico del escarabajo | 24×24 px         | Registro píxel; única traducción píxel de la marca  |
| `pixel/moneda-12.png`               | Moneda de Ámbar                | 12×12 px         | Objeto de ejemplo del registro; tokens, recompensas |
| `fonts/PixelifySans-Variable.woff2` | Tipografía píxel               | variable 400–700 | Diálogo y display del registro píxel                |

Selección: horizontal por defecto → vertical en cuadrado → NG bajo 120 px → isotipo para cierre/avatar. `Numinia_Word` jamás firma comunicación corporativa.

### 8.2 Cómo sí

Arena sobre Nocturno, Noche sobre Diurno — no hay versión en acento. Área de respeto = altura de la «n» por los cuatro lados. Mínimos: wordmark 24 px / 12 mm; isotipo-favicon 16 px. Sobre imagen: velo `rgba(20,17,15,.72)` mínimo. Sobre la textura de circuito: solo dentro de una **zona de calma** (área lisa equivalente al doble del área de respeto).

### 8.3 Cómo no

NO recolorear a acentos (la marca no compite con la señal) · NO rotar ni inclinar · NO sombras, degradados ni relieves · NO deformar proporciones · NO encerrar en formas ajenas · NO sobre fondo activo sin velo · NO `Numinia_Word` firmando lo corporativo · **NO redibujar el escarabajo**: el path canónico (abajo) es el único válido — sustituye cualquier reconstrucción previa. Única excepción cerrada: el sprite píxel canónico de §2.4, que tampoco se redibuja — se usa el entregado.

### 8.4 Isotipo canónico (referencia embebida)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.44 75.53" fill="currentColor">
<path d="M75.44,48.41v-6.01c0-7.43-2.44-12.51-6.61-15.5,3.83-2.74,6.21-7.23,6.58-13.69h0V0h-15.86v7.92h8.44v5.29h-.01c-.58,7.07-4.65,10.37-11.02,10.37h0s-.79,0-.79,0c-.91-11.22-8.07-16.29-18.43-16.29s-17.51,5.07-18.43,16.29h-.8c-6.37,0-10.44-3.3-11.02-10.37h-.01v-5.29h8.44V0H.03v13.22h0c.37,6.46,2.75,10.96,6.58,13.69-4.17,2.99-6.61,8.06-6.61,15.5v6.01h7.43v-6.01c0-8.32,4.21-12.17,11.1-12.17h0s.66,0,.66,0v13.83c0,2.48.28,4.7.79,6.67h-1.51C7.91,50.73.68,56.02,0,67.71h0v7.81h23.14v-7.8H7.45c.58-7.07,4.65-10.37,11.02-10.37h4.91c3.26,3.74,8.24,5.51,14.34,5.51s11.09-1.77,14.34-5.51h4.91c6.37,0,10.44,3.3,11.02,10.37h-15.7v7.8h23.14v-7.81h0c-.68-11.7-7.9-16.98-18.46-16.98h-1.51c.52-1.97.79-4.19.79-6.67v-13.83h.66c6.89,0,11.1,3.85,11.1,12.17v6.01h7.43ZM37.72,13.91c6.21,0,10.22,3.13,10.97,9.83-4.62.66-8.39,2.55-10.94,5.81-2.56-3.28-6.35-5.16-10.99-5.82.74-6.69,4.76-9.82,10.97-9.82ZM26.62,44.07v-13.54c4.67,1.22,7.41,5.02,7.41,11.73v13.55c-4.67-1.22-7.41-5.02-7.41-11.73ZM48.82,44.07c0,6.68-2.72,10.48-7.35,11.72v-13.53c0-6.68,2.72-10.48,7.35-11.71v10.73h0v2.79Z"/>
<path d="M46.18,7.36c-.57-4.16-4.14-7.36-8.46-7.36s-7.89,3.2-8.46,7.36c2.55-.77,5.39-1.15,8.46-1.15s5.91.38,8.46,1.15Z"/>
</svg>
```

---

## 9. Componentes [EXTENSIÓN]

Todos demostrados en vivo en `index.html`.

### 9.1 Botones

| Tipo            | Estilo                                                         | Cuándo                                                              |
| --------------- | -------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Primario**    | Fondo Turquesa, texto blanco                                   | La acción principal. **Uno por vista**                              |
| **Fantasma**    | Transparente, borde `linea.fuerte`; hover borde+texto Verdemar | Acción secundaria                                                   |
| **Silencioso**  | Solo texto Verdemar, subrayado al hover                        | Acción terciaria                                                    |
| **Destructivo** | Fondo Grana, texto blanco                                      | Irreversible. **Confirmación obligatoria. Nunca junto al primario** |

Especificación: radio `6px`, padding `10×24`, altura M 40 px / S 32 px, peso 500. Estados: hover aclara el fondo un paso (`#02A4BA`), active oscurece (`#017486`), disabled `superficie` + texto terciario + `not-allowed`, cargando con **puntos de espera** (§10) y ancho bloqueado. Icono opcional a la izquierda, 16 px, `gap s200`, mismo color. La etiqueta es un **verbo que dice exactamente lo que ocurre** y conserva el nombre en todo el flujo. Nunca versales.

### 9.2 Píldoras de estado

Mono `cuerpo.s`, radio `6px`, punto de 8 px en `currentColor`, borde del color al 40 %. Mapeo semántico §3.4. Siempre con texto: el punto nunca va solo.

### 9.3 Campo de entrada

Fondo `base`, borde `linea.fuerte`, radio `6px`, padding `10×16`; etiqueta encima en `type.etiqueta`; placeholder en terciario (nunca como sustituto de la etiqueta); foco = outline Turquesa del sistema; error = borde Grana + mensaje que explica qué pasó y cómo seguir.

### 9.4 Tarjeta

Fondo `superficie`, borde `linea.tenue`, padding `s500`, cantos rectos, **sin textura y sin sombra**; hover PUEDE subir un escalón de superficie (§10, elevación). Titular `titulo.s`, cuerpo `cuerpo.s` en secundario.

### 9.5 Dato / KPI

Cifra en Mono tabular `dato.xl`, etiqueta en `type.etiqueta` terciario debajo. El color de la cifra sigue la semántica (§3.4). Fondo `base` con borde: el dato es una sonda, no una tarjeta.

### 9.6 Componentes del registro píxel [EXTENSIÓN — validar]

Estos componentes viven **dentro de una escena o experiencia píxel**. No sustituyen los componentes corporativos de §9.1–9.5.

| Componente               | Construcción                                                                                     | Regla de uso                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| **Caja de diálogo**      | superficie Basalto o Bronce oscuro, borde 1 px Noche, texto Pixelify, hablante en color aprobado | una voz por bloque; lectura completa disponible antes o después del tecleo |
| **Retrato**              | rejilla `24×24` o módulo `48×48`, silueta clara, mismo sentido de luz que la escena              | acompaña a una conversación; no sustituye el nombre del hablante           |
| **Ranura de inventario** | objeto `12×12`, marco recto `linea-fuerte`, nombre visible en foco o selección                   | estado seleccionado = borde Turquesa + etiqueta; no solo cambio de color   |
| **HUD breve**            | números en Geist Mono o Pixelify, icono `12×12`, fondo liso                                      | solo estado necesario durante la acción; nada ornamental                   |
| **Logro / insignia**     | rejilla `12×12` o `24×24`, rareza escrita y tratamiento §3.6                                     | el halo legendario sigue siendo el único glow                              |

El foco del sistema (`2 px` Turquesa, offset `2 px`) permanece vectorial y visible incluso alrededor de un componente píxel. La accesibilidad tiene precedencia sobre la fidelidad histórica.

---

## 10. Movimiento y animación [CANON — decisión de dirección]

Principios (de _Curiosity_): nada se mueve donde el usuario actúa; el contenido se revela donde el usuario descubre; **un solo momento orquestado por pieza**; con `prefers-reduced-motion` todo aparece al instante (se conserva la opacidad, se elimina el desplazamiento); el movimiento no bloquea el scroll. Curva por defecto `cubic-bezier(.2,0,0,1)`.

### 10.1 El catálogo — nueve animaciones, y ninguna más

| #      | Animación                                                                                                                            | Especificación                                                               | Dónde sí                                                            | Dónde no                                             |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------- |
| **01** | **Tecleo** — la bandera [CANON]: texto letra a letra con cursor de bloque, herencia de las aventuras gráficas y terminales de los 90 | `22 ms/carácter`, lineal; cursor de bloque en Ámbar                          | Titulares hero, revelaciones de lore (nivel II), cargas de producto | Cuerpo largo, interfaz funcional, nivel III, impreso |
| 02     | Revelado por avance                                                                                                                  | `320 ms` · ciclo; opacidad + 8 px de ascenso, al entrar en viewport, una vez | Contenido al descubrirse                                            | Controles; re-disparo en scroll                      |
| 03     | Barrido de señal                                                                                                                     | `8 s` lineal infinito; banda Turquesa recorriendo la binaria                 | **Máximo uno por vista** — la dosis cyber ambiental                 | Varios a la vez; sobre texto de lectura              |
| 04     | Elevación                                                                                                                            | `120 ms` · ciclo; sube un escalón de superficie, **sin desplazamiento**      | Hover de superficies                                                | Cualquier movimiento de posición                     |
| 05     | Pulso legendario                                                                                                                     | `2.4 s` ease-in-out **× 2**; el halo respira                                 | Solo el momento de obtención; después, halo estático                | Loop ambiental; otros elementos                      |
| 06     | Fase de progreso                                                                                                                     | `560 ms`/fase · steps(1); el indicador avanza por fases lunares              | Cargas largas, progreso de secuencia real                           | Esperas < 2 s                                        |
| 07     | Puntos de espera                                                                                                                     | `900 ms` · steps(3); `Cargando···`                                           | Botones cargando                                                    | Texto corriente                                      |
| 08     | Cursor de bloque                                                                                                                     | `1 s` · steps(2)                                                             | Acompañando al tecleo o a un campo activo                           | Suelto, decorativo                                   |
| 09     | Momento orquestado                                                                                                                   | Tecleo del titular + revelados escalonados a `80 ms`                         | La entrada de la pieza — uno por pieza                              | Repetido; en cada sección                            |

### 10.2 Prohibido siempre

Parallax. **Glitch** (tentador con el cyber al 20 %: rompe la calma solar y la accesibilidad). Loops ambientales fuera del barrido. Animar el color del texto de lectura. Animar el foco. Autoplay con sonido.

### 10.3 Referencia de implementación del tecleo

El texto completo DEBE estar en el DOM antes de animarse (SEO y accesibilidad): se fija `aria-label` con el contenido íntegro, se vacían los nodos de texto conservando el marcado, se escriben a `22 ms` con el cursor `▌` siguiendo la escritura, y al terminar se retira cursor y `aria-label`. Sin JS o con movimiento reducido: el texto simplemente está.

### 10.4 Animación de sprites [EXTENSIÓN — validar]

La animación interna de un sprite es contenido del registro píxel, no una décima animación de interfaz. Se limita a acciones narrativas o de juego y NO autoriza movimiento del layout, botones o superficies.

- **Dos fotogramas:** alternancia de gesto, chispa, indicador o movimiento mínimo. Los extremos deben ser distintos y legibles.
- **Cuatro fotogramas:** ciclo de marcha o acción sencilla. Orden recomendado para locomoción: contacto · paso · contacto opuesto · paso opuesto.
- **Cadencia:** usa duraciones ya existentes: `120 ms` por fotograma para acciones rápidas, `200 ms` para locomoción y gestos, `320 ms` para revelaciones deliberadas. No se inventa una duración por sprite.
- **Pose clave primero:** se dibujan las poses de mayor lectura antes de los intermedios. Si un ciclo no se entiende con las poses clave, añadir fotogramas no lo arregla.
- **Sin interpolación:** no hay _tweening_, desenfoque de movimiento, rotación suavizada ni desplazamiento subpíxel. El movimiento ocurre en saltos enteros y las poses cargan con la sensación de peso.
- **Volumen estable:** cabeza, torso y masa principal conservan tamaño. El contorno solo cambia cuando la acción lo exige; el temblor involuntario invalida el ciclo.
- **Loops con causa:** marcha mientras el personaje camina, máquina mientras opera, señal mientras comunica. Un personaje inmóvil no necesita respirar eternamente; la quietud también es una decisión.
- **Movimiento reducido:** se muestra la pose de mayor información, se completan estados funcionales al instante y se detienen ciclos decorativos.

La rotación de paleta de §3.7.3 y los ciclos de sprite no pueden competir en la misma zona focal: un solo momento orquestado por pieza sigue siendo la regla.

---

## 11. Identidad verbal

**Voz [CANON]:** cultivada, llana y clara; precisión con un toque de fantasía; sin tecnicismos hasta alcanzar al receptor. Líneas: _Precision meets playfulness_ · _Building Bridges, Not Walls_ · _Innovation with a human touch_.

**Tres niveles [CANON] — REGLA DURA:** cada pieza declara su nivel y lo mantiene. **I Coloquial** (comunidad, jerga tech/web3): redes, producto, interfaz. **II Literario** (lore): home, portadas, evento, campañas. **III Técnico** (fundamento): documentación, propuesta, contrato. Un contrato con lore no se firma; una home con KPIs no convoca.

**Mensajes clave [CANON]** (se eligen por espacio, no se reescriben): 15 palabras _Empower and transform organizational culture with engaging experiences that foster fun and drive impactful social change_ · 11 _Foster organizational transformation and social change through engaging, fun experiences_ · 8 _Cultivate fun, transformative experiences for organizational and social change_ · 7 _Create fun, drive social change in organizations_.

**Léxico interno [CANON]:** Oráculos · Numinianos · Dark Councils · Public Domain Day.

**Interfaz [DERIVADO]:** voz activa; el control dice exactamente qué ocurre y conserva el nombre en el flujo; el error explica qué pasó y cómo seguir, sin disculpa y sin vaguedad; la pantalla vacía invita a actuar; específico antes que ingenioso.

**Archivos [CANON]:** `AAAA_MM_DD-Nombre_Del_Documento-vX.Y.Z.ext`, sin espacios ni acentos.

---

## 12. Accesibilidad · _Equable_

**WCAG 2.2 AA** (EN 301 549, obligación legal UE). Contraste 4.5:1 / 3:1. Foco visible siempre. Teclado en orden lógico. Nada solo por color — rareza incluida. Táctil 44×44. Alternativa textual en imagen informativa. `prefers-reduced-motion` respetado (§10). En evento: señalética legible a 10 m sin depender del color; instrucciones también en nivel I.

---

## 13. Recetas de aplicación

**Web:** Nocturno, 12 col ≤1280; hero = tesis con relieve al fondo y tecleo del titular (el momento orquestado); nivel II en home, I/III en internas; menú visible y discreto; LCP < 2.5 s, < 1 MB inicial; fuentes e iconos autoalojados.
**Deck:** 1920×1080, Nocturno, márgenes 120; eyebrow Mono/Ámbar → `display.m` → entradilla → contenido; máx. 4 tarjetas; una idea por diapositiva; separadores binarios; cierre = contacto + pasos + Khepri.
**Documento:** Diurno, A4, nivel III, sin textura; cifras Mono tabular; pie `AAAA_MM · Confidencial`; propuesta cierra con alcance, total sin IVA y tres pasos numerados.
**Evento:** credencial Diurno legible a 1,5 m; distintivos nombre+símbolo+color; señalética a 10 m; soportes reutilizables.
**Producto:** Nocturno por defecto, nivel I, Turquesa interactivo, Phosphor por peso, rareza donde haya objetos.
**3D:** normal map como material PBR; Ámbar luz cálida clave, Turquesa relleno frío; rareza en material + etiqueta, nunca solo emisivo.
**Escena píxel:** Nocturno, nivel II; índice Khepri-16 con dominancia neutral ≥60 %; sprites a rejilla 24/12/48 con contorno Noche; Pixelify a múltiplos; diálogo tecleado y coloreado por hablante; escalado entero con `pixelated`; se entra y se sale del registro por completo.

### 13.1 Pipeline de producción de una escena píxel [EXTENSIÓN — validar]

1. **Declarar función y nivel.** Escribir qué debe comprender, descubrir o hacer la persona; confirmar que el nivel II está justificado.
2. **Elegir la rejilla.** Asignar `12×12`, `24×24` y módulos `48×48` antes de dibujar. Inventariar activos y estados.
3. **Miniatura de masas.** Componer fondo, plano de juego, primer plano y foco solo con neutrales. Verificar la dosis 40/40/20 entrecerrando los ojos.
4. **Siluetas.** Resolver personajes y objetos interactivos en un color. Probar dirección, pose y jerarquía a ×1.
5. **Valores y luz.** Añadir sombra, cuerpo y luz desde arriba-izquierda; bloquear sombras proyectadas antes de los detalles.
6. **Asignar rampas.** Elegir rampas de §3.7.1, mantener neutrales ≥60 % y reservar los acentos para función o relato.
7. **Construir clústeres.** Limpiar píxeles aislados, regular diagonales, aplicar contorno selectivo y usar tramado solo donde §3.7.2 lo permite.
8. **Añadir interfaz y texto.** Integrar componentes de §9.6, contraste AA, foco visible y alternativa de movimiento reducido.
9. **Animar desde poses clave.** Seleccionar 2–4 fotogramas y una cadencia de §10.4. Probar el ciclo a ×1 sin suavizado.
10. **Exportar y validar.** Exportar maestro en PNG indexado; sprite sheets con celdas uniformes; comprobar paleta, transparencia, escala entera, peso, nombres y ausencia de colores fuera de Khepri-16.

### 13.2 Entregables mínimos [EXTENSIÓN — validar]

| Entregable           | Debe contener                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------- |
| **Maestro editable** | modo indexado, paleta Khepri-16 ordenada, capas o grupos nombrados, fotogramas etiquetados    |
| **PNG individual**   | dimensiones nativas, transparencia binaria, sin suavizado ni reescalado                       |
| **Sprite sheet**     | celdas uniformes, mismo origen, secuencia documentada, sin margen accidental entre fotogramas |
| **Ficha de activo**  | función, rejilla, estados, rampa, duración, punto de anclaje, texto alternativo si aplica     |
| **Captura de QA**    | vista ×1 y escala entera, fondo real, estado de foco y variante de movimiento reducido        |

**Criterio de salida:** el activo se aprueba primero a ×1. La ampliación solo demuestra; nunca rescata.

---

## 14. Referencias y créditos

| Recurso                                                        | Autoría                     | Licencia                 | Enlace · distribución                                                                                                                                 | Uso en el sistema                                                                        |
| -------------------------------------------------------------- | --------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Geist · Geist Mono**                                         | Vercel                      | SIL OFL 1.1              | [vercel.com/font](https://vercel.com/font) · npm `geist` · autoalojado en `/assets/fonts/`                                                            | Tipografía única (§4)                                                                    |
| **Phosphor Icons**                                             | Helena Zhang · Tobias Fried | MIT                      | [phosphoricons.com](https://phosphoricons.com) · [github.com/phosphor-icons/core](https://github.com/phosphor-icons/core) · npm `@phosphor-icons/web` | Iconografía única (§7)                                                                   |
| **Pixelify Sans**                                              | Stefie Justprince           | SIL OFL 1.1              | [Google Fonts](https://fonts.google.com/specimen/Pixelify+Sans) · autoalojada en `/assets/fonts/`                                                     | Tipografía del registro píxel (§4.5)                                                     |
| **Monkey Island · Day of the Tentacle · La Abadía del Crimen** | LucasArts · Opera Soft      | Herencia cultural citada | —                                                                                                                                                     | Referencia del registro píxel (§2.4); no se usan activos                                 |
| **W3C Design Tokens (DTCG)**                                   | W3C Community Group         | Especificación abierta   | [design-tokens.github.io/community-group/format](https://design-tokens.github.io/community-group/format/)                                             | Formato de tokens (§19.3)                                                                |
| **WCAG 2.2**                                                   | W3C                         | Norma (EN 301 549)       | [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/)                                                                                                     | Suelo de accesibilidad (§12)                                                             |
| **Octalysis**                                                  | Yu-kai Chou                 | Marco conductual         | [yukaichou.com](https://yukaichou.com/gamification-examples/octalysis-complete-gamification-framework/)                                               | Diseño conductual de las propuestas                                                      |
| **8 Bit & ‘8 Bitish’ Graphics — Outside the Box**              | Mark Ferrari · GDC 2016     | Referencia profesional   | [gdcvault.com/play/1023586](https://www.gdcvault.com/play/1023586/8-Bit-8-Bitish-Graphics)                                                            | Clústeres, paleta limitada y cambio de paleta; referencia de producción, no canon visual |
| **ScummVM · Understanding the graphics settings**              | Proyecto ScummVM            | GPL / documentación      | [docs.scummvm.org](https://docs.scummvm.org/en/latest/advanced_topics/understand_graphics.html)                                                       | Escalado de gráficos de aventura, nearest-neighbor y preservación del píxel              |
| **SDL · Integer scale**                                        | Simple DirectMedia Layer    | zlib                     | [wiki.libsdl.org](https://wiki.libsdl.org/SDL2/SDL_RenderSetIntegerScale)                                                                             | Referencia técnica para escalado entero                                                  |
| **Aseprite · Indexed color y sprite sheets**                   | Igara Studio                | Documentación oficial    | [aseprite.org/docs](https://www.aseprite.org/docs/color-mode/)                                                                                        | Flujo indexado, paleta cerrada y exportación de hojas de sprites                         |
| **Rueda de Plutchik · Arquetipos de Jung**                     | —                           | Fundamento teórico       | —                                                                                                                                                     | Emoción y personalidad del Brand & Culture                                               |
| **Brand & Culture Numinia v0.1.2**                             | Numen Games                 | Interno                  | `2026_03_20-Numinia_Brand_and_Culture-v0.1.2.pdf`                                                                                                     | Fuente de la identidad                                                                   |

---

## 15. Licencia · _Legal by Design_ [DERIVADO]

**CC0 1.0 Universal** para todo el sistema. **Excepción:** logotipo, isotipo Khepri, «Numen Games» y «Numinia» son identificadores de origen y quedan fuera. Se puede copiar el sistema; no se puede decir que se es Numen. Lo liberado usa formatos abiertos y licencias libres (OFL, MIT). Public Domain Day es el momento de liberar lo acumulado.

---

## 16. Lo que falta · hoja de ruta [EXTENSIÓN]

1. **Dirección de fotografía e ilustración** — el mayor hueco expresivo: tratamiento (velo Noche, temperatura cálida, grano), encuadre, qué no fotografiar; ahora además con criterio 40/40/20. 2. **Biblioteca Figma** con Variables sincronizadas al DTCG. 3. **Plantillas maestras** (deck, A4, propuesta). 4. **`@numen/khepri-css`** en npm, CC0. 5. **Set de aplicación** (favicon, app icons, OG, redes, firma email). 6. **Material 3D completo** (albedo, roughness, AO + guía de iluminación). 7. **Biblioteca de sprites** — la guía de producción ya define gramática, rampas, clústeres, componentes, animación, exportación y QA; faltan el set de trabajo y sus maestros editables (personajes 24 px con ciclos de 2–4 fotogramas, objetos 12 px, módulos de escena 48 px). 8. **Biblioteca de movimiento** grabada (el catálogo §10 ya especifica; faltan capturas de referencia por medio). 9. **Glosario/lore versionado**. 10. **Identidad sonora** (logo sonoro, SFX de interfaz — el tecleo pide su clic—, regla de silencio; el tecleo píxel pide su clic). 11. **Proceso de auditoría** semestral.

---

## 17. Gobernanza

Semver: MAYOR ruptura/dirección · MENOR adiciones · PARCHE correcciones. Jerarquía: Brand & Culture > este documento > cualquier pieza. Revisión semestral. Cambios con problema + pieza + valor propuesto. Toda EXTENSIÓN validada asciende al Brand & Culture.

---

## 18. Registro de versiones

| Versión | Fecha      | Cambios                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.3.0   | 2026-08-04 | **Guía detallada de producción de Pixel Art** [EXTENSIÓN — validar], integrada en las secciones existentes: gramática visual, silueta, clústeres, contorno selectivo, rampas funcionales, tramado, cambio de paleta limitado al catálogo, composición y profundidad, rejilla interna, componentes de escena, animación de sprites con duraciones canónicas, pipeline, entregables, exportación indexada y QA a ×1. Referencias profesionales y técnicas añadidas sin convertirlas en canon visual.                                                                                     |
| 3.2.0   | 2026-08-03 | **Registro píxel** [CANON]: la herencia de las aventuras gráficas como registro de renderizado del nivel II. Paleta indexada **Khepri-16** (cero hexes nuevos, dominancia neutral ≥60 %, subconjunto de diálogo verificado — Grana excluida). Tipografía píxel **Pixelify Sans** autoalojada (las fuentes SCUMM son propietarias: herencia citada, no imitada). **Sprite canónico de Khepri** 24 px y moneda 12 px como excepción cerrada al no-redibujo. Reglas de rejilla, escalado entero, contorno, tramado y entrada/salida completa del registro. Demostrado en vivo en la guía. |
| 3.1.0   | 2026-08-03 | Dosis de dirección fijada: **Solarpunk 40 · Steampunk 40 · Cyberpunk 20**, con test de mezcla. **Catálogo de animación** (9 piezas; el Tecleo de aventuras gráficas como bandera) con prohibiciones. **Componentes**: botones (4 tipos + estados), píldoras, campo, tarjeta, KPI. Cómo sí / cómo no de marca, texturas e iconos. Sección de **Referencias y créditos**. Guía web completa con todo demostrado en vivo y autoalojado. Tokens: duraciones de animación añadidas.                                                                                                         |
| 3.0.0   | 2026-08-03 | Phosphor sustituye a los iconos a medida (ruptura). Escala de rareza. Materia (normal map + derivados CSS). Activos reales normalizados; isotipo embebido. Geist=Vercel confirmado. Hoja de ruta.                                                                                                                                                                                                                                                                                                                                                                                      |
| 2.0.0   | 2026-08-03 | Reescritura desde el Brand & Culture: paleta canónica, Geist, niveles de lengua, CC0, procedencias.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 1.0.0   | 2026-08-03 | «La Carta». Obsoleta: identidad inventada previa a la lectura del Brand & Culture.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

---

## 19. Contrato de agente

### 19.1 Precedencia

1 Instrucción de la persona → 2 Accesibilidad y REGLAS DURAS → 3 Brand & Culture → 4 este documento → 5 material previo → 6 criterio propio. Si 1 contradice 2, señalarlo y proponer la alternativa accesible antes de ejecutar.

### 19.2 Algoritmo

```
1 Medio (§13) → 2 Modo (emite=Nocturno | imprime=Diurno) → 3 Nivel de lengua (§11)
→ 4 Tokens (§19.3) → 5 Retícula (§5) → 6 Escala tipo (§4.3) → 7 Iconos Phosphor (§7.1)
→ 8 ¿Juego? rareza (§3.6) → 9 ¿Registro píxel? producción (§2.4, §3.7, §4.5, §5.1, §9.6, §10.4, §13.1)
→ 10 ¿Movimiento? solo del catálogo (§10.1) → 11 Copy en el nivel fijado → 12 Checklist (§19.4)
```

Un valor fuera de §19.3 NO DEBE inventarse.

### 19.3 Tokens canónicos (W3C DTCG)

```json
{
  "$description": "Numen Games Design System · Khepri · v3.3.0 · Solar 40 / Steam 40 / Cyber 20",
  "color": {
    "$type": "color",
    "marca": {
      "verdemar": { "$value": "#A6DAD5" },
      "turquesa": { "$value": "#018EA1" },
      "ambar": { "$value": "#EFA517" },
      "arena": { "$value": "#F9EBDC" },
      "coral": { "$value": "#F35059" },
      "grana": { "$value": "#D33440" }
    },
    "texto-sobre-claro": {
      "turquesa": { "$value": "#016E7D" },
      "grana": { "$value": "#B02330" },
      "ambar": { "$value": "#7A5100" }
    },
    "nocturno": {
      "fondo-base": { "$value": "#14110F" },
      "fondo-superficie": { "$value": "#1E1A17" },
      "fondo-elevada": { "$value": "#292420" },
      "linea-tenue": { "$value": "#241F1B" },
      "linea-fuerte": { "$value": "#3A332D" },
      "texto-primario": { "$value": "#F9EBDC" },
      "texto-secundario": { "$value": "#C4B5A6" },
      "texto-terciario": { "$value": "#8A7D72" }
    },
    "diurno": {
      "fondo-base": { "$value": "#F9EBDC" },
      "fondo-superficie": { "$value": "#FDF6EE" },
      "fondo-tinte": { "$value": "#E4F2F0" },
      "linea-tenue": { "$value": "#E2D3C2" },
      "texto-primario": { "$value": "#14110F" },
      "texto-secundario": { "$value": "#4A423B" },
      "texto-terciario": { "$value": "#6E6259" }
    },
    "rareza": {
      "pobre": {
        "$value": "#F9EBDC",
        "$extensions": { "numen": { "diurnoTexto": "#6E6259", "alias": "arena" } }
      },
      "comun": {
        "$value": "#8A7D72",
        "$extensions": { "numen": { "diurnoTexto": "#5A4F45", "alias": "ceniza" } }
      },
      "poco-comun": {
        "$value": "#8FC46B",
        "$extensions": { "numen": { "diurnoTexto": "#356C19" } }
      },
      "raro": { "$value": "#5D9BD6", "$extensions": { "numen": { "diurnoTexto": "#2E6BB0" } } },
      "epico": { "$value": "#A98BE0", "$extensions": { "numen": { "diurnoTexto": "#6B44B8" } } },
      "legendario": {
        "$value": "#EFA517",
        "$extensions": {
          "numen": {
            "diurnoTexto": "#7A5100",
            "alias": "ambar",
            "halo": "0 0 12px rgba(239,165,23,.25)"
          }
        }
      }
    }
  },
  "fontFamily": {
    "$type": "fontFamily",
    "sans": { "$value": ["Geist", "Inter", "Aptos", "Segoe UI", "Arial", "sans-serif"] },
    "mono": { "$value": ["Geist Mono", "Consolas", "Courier New", "monospace"] },
    "pixel": {
      "$value": ["Pixelify Sans", "Geist", "sans-serif"],
      "$description": "Solo registro píxel: diálogo, display de escena, HUD"
    }
  },
  "fontSize": {
    "$type": "dimension",
    "display-xl": { "$value": "4.300rem" },
    "display-l": { "$value": "3.583rem" },
    "display-m": { "$value": "2.986rem" },
    "titulo-l": { "$value": "2.488rem" },
    "titulo-m": { "$value": "2.074rem" },
    "titulo-s": { "$value": "1.728rem" },
    "cuerpo-l": { "$value": "1.440rem" },
    "cuerpo-m": { "$value": "1rem" },
    "cuerpo-s": { "$value": "0.875rem" },
    "etiqueta": { "$value": "0.750rem" }
  },
  "space": {
    "$type": "dimension",
    "100": { "$value": "4px" },
    "200": { "$value": "8px" },
    "300": { "$value": "12px" },
    "400": { "$value": "16px" },
    "500": { "$value": "24px" },
    "600": { "$value": "32px" },
    "700": { "$value": "48px" },
    "800": { "$value": "64px" },
    "900": { "$value": "96px" },
    "1000": { "$value": "128px" }
  },
  "borderRadius": {
    "$type": "dimension",
    "0": { "$value": "0px" },
    "150": { "$value": "6px" },
    "completo": { "$value": "9999px" }
  },
  "duration": {
    "$type": "duration",
    "instante": { "$value": "120ms" },
    "corto": { "$value": "200ms" },
    "medio": { "$value": "320ms" },
    "largo": { "$value": "560ms" },
    "tecleo-caracter": { "$value": "22ms" },
    "cursor": { "$value": "1000ms" },
    "puntos-espera": { "$value": "900ms" },
    "pulso": { "$value": "2400ms" },
    "fase-lunar": { "$value": "560ms" },
    "barrido": { "$value": "8000ms" },
    "escalonado": { "$value": "80ms" }
  },
  "cubicBezier": { "$type": "cubicBezier", "ciclo": { "$value": [0.2, 0, 0, 1] } },
  "asset": {
    "logo-khepri": { "$value": "Khepri_Logo.svg" },
    "logo-khepri-ng": { "$value": "Khepri_NG_Logo.svg" },
    "logo-ng": { "$value": "NG_Logo.svg" },
    "word-horizontal": { "$value": "Numen_Games_Horizontal_Word.svg" },
    "word-vertical": { "$value": "Numen_Games_Vertical_Word.svg" },
    "word-numen": { "$value": "Numen_Word.svg" },
    "word-numinia": { "$value": "Numinia_Word.svg" },
    "fuente-sans": { "$value": "fonts/Geist-Variable.woff2" },
    "fuente-mono": { "$value": "fonts/GeistMono-Variable.woff2" },
    "textura-normal-3d": { "$value": "textura-circuito-normal.png" },
    "textura-css": { "$value": "textura-relieve-nocturno-768.webp" },
    "textura-hq": { "$value": "textura-relieve-nocturno.png" },
    "textura-alpha": { "$value": "textura-relieve-alpha.webp" }
  },
  "pixel": {
    "$description": "Registro píxel y guía de producción · §2.4, §3.7, §4.5, §5.1, §9.6, §10.4, §13.1",
    "paleta-khepri16": {
      "$value": [
        "#14110F",
        "#1E1A17",
        "#292420",
        "#3A332D",
        "#8A7D72",
        "#C4B5A6",
        "#F9EBDC",
        "#A6DAD5",
        "#018EA1",
        "#016E7D",
        "#EFA517",
        "#7A5100",
        "#F35059",
        "#D33440",
        "#B02330",
        "#8FC46B"
      ]
    },
    "modo-color": { "$value": "indexed" },
    "dominancia-neutral-min": { "$value": "60%" },
    "dialogo-excluidos": { "$value": ["#D33440"] },
    "rejillas": { "$value": [12, 24, 48] },
    "escalas": { "$value": [2, 3, 4, 6, 8] },
    "interpolacion": { "$value": "nearest-neighbor" },
    "coordenadas": { "$value": "integer-only" },
    "contorno": { "$value": "#14110F" },
    "luz": { "$value": "top-left" },
    "dithering": { "$value": "two-color-checkerboard" },
    "fotogramas-ciclo": { "$value": [2, 4] },
    "duracion-fotograma": { "$value": ["120ms", "200ms", "320ms"] },
    "formato-maestro": { "$value": "indexed-png" },
    "transparencia": { "$value": "binary-alpha" },
    "sprite-khepri": { "$value": "pixel/khepri-sprite-24.png" },
    "sprite-moneda": { "$value": "pixel/moneda-12.png" },
    "fuente": { "$value": "fonts/PixelifySans-Variable.woff2" }
  },
  "icon": {
    "sistema": { "$value": "phosphor" },
    "defecto": { "$value": "regular" },
    "activo": { "$value": "fill" },
    "pequeno": { "$value": "bold", "$extensions": { "numen": { "umbral": "<16px" } } },
    "display": { "$value": "light", "$extensions": { "numen": { "umbral": ">=48px" } } },
    "prohibidos": { "$value": ["thin", "duotone"] }
  }
}
```

### 19.4 Checklist previa a la entrega

- [ ] Modo, nivel de lengua y **dosis 40/40/20** correctos (test de mezcla §2.1: ni Blade Runner ni catálogo de jardinería).
- [ ] Colores solo de §19.3; máx. tres por composición; Coral y Grana no coexisten; variantes de texto sobre claro.
- [ ] Espaciado en escala de 4; solo Geist Sans/Mono autoalojadas; un nivel de display; cifras Mono tabular.
- [ ] Iconos Phosphor por peso; nunca thin/duotone; etiqueta en primer uso; sin mezclar pesos en fila; Khepri y Luna nunca como iconos.
- [ ] Marca según §8: lockup correcto, Arena/Noche, respeto, zona de calma sobre textura; sin recolorear/rotar/sombrear/deformar; el escarabajo es el path de §8.4.
- [ ] Textura solo en fondo Nocturno ≤6 %, `cover`, superficies elevadas lisas, nunca en Diurno.
- [ ] Si hay juego: rareza completa con tratamiento progresivo y nombre; nunca en lo corporativo.
- [ ] Movimiento solo del catálogo §10.1; un momento orquestado; un barrido máximo; pulso solo en obtención; nada de parallax/glitch; `prefers-reduced-motion` respetado; foco sin animar.
- [ ] Botones: un primario por vista; destructivo con confirmación y lejos del primario; etiquetas = verbos, sin versales.
- [ ] Contrastes AA; nada solo por color; medida ≤90; secuencias con fases lunares solo si hay secuencia real; cierre con Khepri en pieza mayor; nombre de archivo §11.
- [ ] Si es registro píxel: solo Khepri-16, neutrales ≥60 %, Grana sin diálogo, rejilla 12/24/48, escalado entero con `pixelated`, contorno Noche, Pixelify a múltiplos, sprite de Khepri el canónico, entrada/salida completa del registro, y nunca en nivel III.
- [ ] Pixel Art producido a ×1: silueta legible, clústeres continuos, diagonales regulares, sin _pillow shading_, luz arriba-izquierda, máximo 2–4 colores por material, tramado solo entre colores adyacentes, sin píxeles aislados decorativos.
- [ ] Sprites: celdas y anclajes estables, 2–4 fotogramas, duraciones 120/200/320 ms, sin interpolación ni subpíxel; movimiento reducido muestra la pose más informativa.
- [ ] Exportación: PNG indexado, transparencia binaria, paleta Khepri-16 verificada, sprite sheet uniforme, prueba ×1 + escala entera + viewport mínimo.
- [ ] Se ha retirado un elemento antes de entregar.

### 19.5 Fragmento de instrucción reutilizable

```
Diseña con el Numen Games Design System «Khepri» v3.3.0.
Dirección: Solarpunk 40 / Steampunk 40 / Cyberpunk 20. La luz domina, la máquina
estructura, la señal parpadea. Ni Blade Runner ni catálogo de jardinería. Khepri
(escarabajo solar) cierra toda pieza; nunca la abre.
Paleta: verdemar #A6DAD5, turquesa #018EA1 (interactivo), ámbar #EFA517 (énfasis/logro),
arena #F9EBDC (neutral), coral #F35059 (aviso), grana #D33440 (crítico). Máx. 3 por
composición; coral y grana no coexisten. Texto sobre claro: #016E7D #B02330 #7A5100.
Nocturno: fondo #14110F, superficies #1E1A17/#292420, texto #F9EBDC/#C4B5A6, líneas
#241F1B/#3A332D. Diurno: papel #F9EBDC, tinta #14110F. Sin sombras en oscuro salvo el
halo legendario 0 0 12px rgba(239,165,23,.25).
Rareza (solo juego, borde progresivo + nombre escrito): pobre #F9EBDC, común #8A7D72,
poco común #8FC46B, raro #5D9BD6, épico #A98BE0, legendario #EFA517.
Tipografía: solo Geist y Geist Mono (Vercel, autoalojadas). Sans afirma, Mono mide;
etiquetas Mono versales +0.10em; cifras tabulares.
Iconos: Phosphor. regular defecto, fill activo, bold <16px, light ≥48px; thin y duotone
prohibidos; etiqueta en primer uso; Khepri y la Luna no son iconos.
Materia: relieve de circuito solo en fondos Nocturno ≤6% cover sin repeat; binaria
10100→xxx como separador; superficies elevadas lisas; nada de textura en Diurno.
Animación, solo estas nueve: tecleo 22ms/car con cursor de bloque (titulares hero, lore,
cargas — la bandera, herencia de aventuras gráficas); revelado 320ms al entrar en
viewport; barrido de señal 8s máx. uno; elevación 120ms sin desplazamiento; pulso
legendario 2.4s ×2 solo al obtener; fase lunar 560ms/paso en cargas largas; puntos de
espera 900ms en botones; cursor 1s; momento orquestado (tecleo + escalonado 80ms), uno
por pieza. Prohibido: parallax, glitch, loops ambientales, animar foco o color de texto.
prefers-reduced-motion: todo instantáneo.
Botones: primario turquesa (uno por vista), fantasma, silencioso, destructivo grana con
confirmación y lejos del primario; radio 6px; etiquetas = verbos, sin versales.
Copy: cultivada, llana y clara; declara nivel I/II/III y mantenlo.
Registro píxel (solo cuando la narrativa lo pide, nivel II): paleta cerrada Khepri-16
(los 16 hexes existentes del sistema), neutrales ≥60% de superficie, Grana solo relleno;
sprites en rejilla 12/24/48, diseñados y validados a ×1, con silueta primero, clústeres
continuos, diagonales regulares, contorno selectivo Noche y luz arriba-izquierda. Cada
material usa 2–4 colores de rampas compartidas; sin pillow shading, antialias, blur ni
píxeles aislados decorativos. Tramado solo a dos colores adyacentes y fuera de texto,
contornos e interactivos. Escalado entero con image-rendering pixelated, coordenadas y
anclajes enteros; Pixelify Sans a múltiplos exactos solo para diálogo/HUD (cuerpo largo
sigue en Geist). Animación de sprites: 2–4 fotogramas, poses clave primero, duraciones
120/200/320ms, celdas estables y sin tweening. Maestro PNG indexado, alpha binaria y
sprite sheets uniformes. Diálogo tecleado y coloreado por hablante; el sprite píxel de
Khepri es el canónico entregado, no se redibuja. Herencia: Monkey Island, DOTT, La
Abadía del Crimen — citada, nunca copiada.
Marca: wordmark horizontal firma por defecto; Arena/Noche; nunca recolorear, rotar,
sombrear ni deformar; Numinia solo para el mundo. WCAG 2.2 AA. Nada solo por color.
```

---

_Numen Games · numengames.com · CC0 1.0 Universal (marcas excluidas)_
_Leave things better than we found them._
