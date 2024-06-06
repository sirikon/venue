#!/usr/bin/env bash
set -euo pipefail

root="$(pwd)"
mkdir -p .workdir
cd .workdir
exec "$root/.venv/bin/python" "$root/src/manage.py" "$@"
