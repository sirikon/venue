#!/usr/bin/env bash
set -euo pipefail

root="$(pwd)"
export PYTHONPATH="$root/src"
exec "$root/.venv/bin/python" -m gunicorn \
  venue_site.asgi:application \
  --workers 1 \
  --worker-class uvicorn.workers.UvicornWorker
