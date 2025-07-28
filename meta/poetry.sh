#!/usr/bin/env bash
set -euo pipefail

POETRY_VERSION=2.1.3

if [ ! -d ".poetry" ]; then
  python3 -m venv .poetry
fi

if [ ! -f "./.poetry/bin/poetry" ]; then
  ./.poetry/bin/pip install poetry=="$POETRY_VERSION"
fi

export POETRY_VIRTUALENVS_IN_PROJECT=true
exec ./.poetry/bin/poetry "$@"
