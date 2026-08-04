#!/usr/bin/env bash
# Test negativo de la guarda de `check-e2e.sh`.
#
# La guarda existe para convertir «cero tests ejecutados» en un error en vez
# de en un verde. Aquí se le provoca ese defecto a propósito —un filtro que
# no coincide con ningún título— y se exige que lo detecte. Si alguien
# simplifica la guarda, esto se pone rojo.

set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

salida="$(scripts/check-e2e.sh --project=chromium -g 'FILTRO-IMPOSIBLE-__no-existe__' 2>&1)"
code=$?

fallos=0

if [ "$code" -eq 0 ]; then
  echo "FALLO: la guarda devolvió 0 pese a no ejecutar ningún test." >&2
  fallos=1
fi

if ! printf '%s' "$salida" | grep -q 'AVISO'; then
  echo "FALLO: no se emitió el aviso de verde falso." >&2
  fallos=1
fi

if [ "$fallos" -ne 0 ]; then
  echo "--- salida obtenida ---" >&2
  printf '%s\n' "$salida" >&2
  exit 1
fi

echo "OK: la guarda detecta el verde falso (exit=${code})."
