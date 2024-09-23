#!/usr/bin/env bash
set -euo pipefail

root="$(pwd)"
mkdir -p .workdir
cd .workdir
export VENUE_DEVENV_FIXTURES="$root/meta/_devenv/fixtures"
exec "$root/.venv/bin/python" "$root/src/manage.py" "$@"
