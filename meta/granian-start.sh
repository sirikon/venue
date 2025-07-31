#!/usr/bin/env bash
set -euo pipefail

# shellcheck disable=SC1091
source "./meta/_/env.sh"

mkdir -p .workdir
cd .workdir

export PYTHONPATH="$VENUE_ROOT/src"
exec "$VENUE_ROOT/.venv/bin/granian" \
  --interface wsgi \
  venue_django.wsgi:application \
  --host="127.0.0.1" \
  --port="8080" \
  --workers 10 \
  --blocking-threads 10
