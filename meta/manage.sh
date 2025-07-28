#!/usr/bin/env bash
set -euo pipefail

# shellcheck disable=SC1091
source "./meta/_/env.sh"

mkdir -p .workdir
cd .workdir

exec "$VENUE_ROOT/.venv/bin/python" "$VENUE_ROOT/src/manage.py" "$@"
