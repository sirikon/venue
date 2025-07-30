#!/usr/bin/env bash
set -euo pipefail

# shellcheck disable=SC1091
source "./meta/_/env.sh"

mkdir -p .workdir
cd .workdir

export PYTHONPATH="$VENUE_ROOT/src"
exec "$VENUE_ROOT/.venv/bin/python" -m gunicorn \
  venue_django.wsgi:application \
  --preload \
  --workers 1 \
  --bind 127.0.0.1:8080
