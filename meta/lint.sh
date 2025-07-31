#!/usr/bin/env bash
set -euo pipefail

exec ./.venv/bin/ruff check "$@" .
