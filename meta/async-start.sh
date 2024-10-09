#!/usr/bin/env bash
set -euo pipefail

root="$(pwd)"
export PYTHONPATH="$root/src"
exec "$root/.venv/bin/python" -m gunicorn \
  venue_site.wsgi:application \
  --workers 1
