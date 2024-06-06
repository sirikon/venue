#!/usr/bin/env bash
set -euo pipefail

cd src
exec ../.venv/bin/python manage.py "$@"
