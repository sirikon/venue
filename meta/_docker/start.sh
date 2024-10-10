#!/usr/bin/env bash
set -euo pipefail

function main {
  trap 'kill -s SIGINT -1 && wait' SIGINT
  start-app &
  start-proxy &
  wait
}

function start-proxy {
  exec caddy run --config /proxy/Caddyfile
}

function start-app {
  export PYTHONPATH="/app/src"
  exec /app/.venv/bin/python -m gunicorn \
    venue_site.wsgi:application \
    --bind=0.0.0.0:81 \
    --workers "${VENUE_WORKERS:-1}"
}

main "$@"
