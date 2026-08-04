#!/usr/bin/env bash
# Ejecuta la suite e2e y distingue «no falló nada» de «se verificó algo».
#
# Un filtro -g que no coincide con ningún título, un testDir vacío o un skip
# masivo producen cero tests ejecutados y código de salida 0: un verde falso
# indistinguible del éxito si solo se mira $?. Este envoltorio falla también
# en ese caso.
#
# Uso:  scripts/check-e2e.sh [args de playwright]
#       scripts/check-e2e.sh -g "panorámica"
#       scripts/check-e2e.sh --project=chromium
#
# Se leen las estadísticas del reporter json en vez de raspar el texto del
# reporter list, cuyo formato no es un contrato estable entre versiones.

set -uo pipefail

json="$(mktemp)"
trap 'rm -f "$json"' EXIT

PLAYWRIGHT_JSON_OUTPUT_NAME="$json" \
  pnpm exec playwright test --reporter=list,json "$@"
code=$?

read -r expected unexpected flaky skipped < <(
  node -e '
    const fs = require("fs");
    let s = {};
    try {
      s = JSON.parse(fs.readFileSync(process.argv[1], "utf8")).stats || {};
    } catch {
      /* sin json utilizable: se informa como 0 y manda el código de salida */
    }
    console.log([s.expected || 0, s.unexpected || 0, s.flaky || 0, s.skipped || 0].join(" "));
  ' "$json"
)

echo
echo "e2e: ${expected} ok · ${unexpected} fallidos · ${flaky} inestables · ${skipped} omitidos (exit=${code})"

if [ "$expected" -eq 0 ] && [ "$unexpected" -eq 0 ] && [ "$flaky" -eq 0 ]; then
  echo "AVISO: no se ejecutó ningún test. Verde falso — revisa el filtro o el testDir." >&2
  exit 1
fi

exit "$code"
