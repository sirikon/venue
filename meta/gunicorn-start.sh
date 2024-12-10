#!/usr/bin/env bash
set -euo pipefail

root="$(pwd)"
mkdir -p .workdir
cd .workdir
export VENUE_DEBUG="true"
export VENUE_FIXTURES="$root/meta/_devenv/fixtures"
export PYTHONPATH="$root/src"
exec "$root/.venv/bin/python" -m gunicorn \
  venue_site.wsgi:application \
  --preload \
  --workers 1
