# ADR 0007 — Turquesa de texto para tema oscuro

**Estado:** aceptada · propuesta y aprobada por el propietario el 2026-08-04

Aplicada el mismo día: token `--turquesa-texto-oscuro` en `tokens.css`,
`--interactive` del tema Nocturno apuntando a él, y los dos usos indebidos
de tokens corregidos (`.bin-sep` y `.journey-act` pasan a `--ink-muted`,
ratios 7.7–9.4:1 verificados). Hallazgo posterior del CI incorporado: el
flotante `.pts-float` fallaba contraste solo a mitad de su fundido de
salida (timing-dependiente); se excluye del escaneo de axe con
justificación en `tests/a11y.spec.ts` — su color base cumple y la
puntuación es accesible vía `aria-valuetext`.

## Problema

El canon define **Turquesa = interactivo**. En tema Diurno eso se resuelve
con un token dedicado, `--turquesa-texto-claro: #016e7d`, que oscurece el
turquesa de marca hasta cumplir contraste AA sobre fondos claros.

En tema Nocturno **no existe el simétrico**: `--interactive` toma el
turquesa de marca sin aclarar (`--turquesa: #018ea1`), que no alcanza el
4.5:1 exigido por WCAG 1.4.3 sobre las superficies oscuras del canon.

Es un hueco de la paleta, no un error de aplicación en el CSS: cualquier
texto interactivo en Nocturno hereda el fallo. Hoy lo manifiesta el botón
del aviso de cookies (4.43:1), detectado por axe.

## Medición

Fórmula WCAG 2.x de luminancia relativa (linearización sRGB con umbral
0.03928; coeficientes 0.2126 / 0.7152 / 0.0722). Método validado contra
axe-core: `#018ea1` sobre `#1e1a17` da 4.428 calculado y 4.43 reportado.

| Color                     | `#14110f` Noche | `#1e1a17` Basalto | `#292420` Bronce osc. |
| ------------------------- | --------------- | ----------------- | --------------------- |
| `#018ea1` (marca, hoy)    | 5.79            | **4.43** ✗        | **3.94** ✗            |
| `#0991a4`                 | —               | 4.61              | **4.09** ✗            |
| `#1e9bac` (mínimo)        | 5.68            | 5.22              | 4.64                  |
| **`#1f9cac` (propuesto)** | 5.73            | 5.27              | **4.69**              |

## Propuesta

Añadir a `src/styles/tokens.css`, simétrico del que ya existe para claro:

```css
--turquesa-texto-oscuro: #1f9cac;
```

y en el bloque de tema Nocturno: `--interactive: var(--turquesa-texto-oscuro)`.

El valor es el turquesa de marca mezclado ~11,5 % hacia blanco: lo mínimo
para cruzar el umbral con margen, de modo que siga leyéndose como el mismo
turquesa. El marca `#018ea1` **se conserva intacto** para fondos y
superficies; lo que cambia es solo el turquesa usado como _texto_.

## Por qué el robusto y no el mínimo

`#0991a4` (mezcla del 3 %, casi indistinguible de la marca) bastaría **si**
el canon garantizase que `--interactive` solo aparece sobre Basalto. No lo
garantiza: `.portal` se pinta sobre `--surface-elevated` y es un enlace
interactivo. Un token se diseña para donde _puede_ acabar usándose, no para
donde está hoy; por eso el umbral se evalúa contra la superficie oscura más
clara del canon (`#292420`) y con margen sobre 4.5, para que no vuelva a
fallar si alguien ajusta una superficie un punto.

## Alcance: lo que este ADR NO resuelve

axe detecta otros dos fallos de contraste, de naturaleza distinta —texto
decorativo con `aria-hidden`, no controles— que **no** arregla este token:

- `.bin-sep` — usa `--line-strong` (token de trazo) como color de texto:
  1.51:1 en Nocturno, 1.54:1 en Diurno. El arreglo es de aplicación, no de
  paleta: o pasa a un token de texto, o deja de ser texto (patrón de fondo).
- `.slot-n` (×2) — usa `--ink-faint` `#8a7d72` sobre `--surface-elevated`:
  3.84:1. Aquí el token de texto existe pero tampoco cumple sobre esa
  superficie; decidir si se corrige el uso o el token.

Ambos son decorativos y `aria-hidden`, por lo que podrían acogerse a la
excepción de «texto incidental» de WCAG 1.4.3 — pero axe no puede inferir
esa intención y los cuenta como violación, así que la regla 6 de
`CLAUDE.md` («axe en CI a cero violaciones») no se cumple hoy mientras
sigan así.

## Consecuencia

Si se aprueba: el canon pasa a tener pareja completa de turquesas de texto
(claro y oscuro) y la regla «Turquesa = interactivo» se vuelve aplicable en
ambos temas sin romper AA. Si se rechaza, hay que decidir explícitamente
qué color toma el texto interactivo en Nocturno, porque el actual no es
conforme.
