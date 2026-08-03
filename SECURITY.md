# Política de seguridad

## Versiones soportadas

Solo la rama `main` desplegada en producción recibe correcciones.

## Reportar una vulnerabilidad

Escribe a **security@numen.games** `[POR DEFINIR: buzón real]` o abre un
_security advisory_ privado en GitHub. No abras issues públicas con detalles
explotables. Nos comprometemos a acusar recibo en 72 h.

## Alcance

Sitio estático sin backend propio: el riesgo principal es la cadena de
suministro (dependencias npm y GitHub Actions). Mitigaciones activas:
lockfile commiteado, Dependabot semanal, builds de scripts bloqueados por
defecto en pnpm (`allowBuilds` explícito) y cabeceras de seguridad en
`public/_headers`.
