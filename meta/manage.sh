#!/usr/bin/env bash
set -euo pipefail

root="$(pwd)"
mkdir -p .workdir
cd .workdir
export VENUE_DEBUG="true"
export VENUE_FIXTURES="$root/meta/devenv/_/fixtures"
exec "$root/.venv/bin/python" "$root/src/manage.py" "$@"
