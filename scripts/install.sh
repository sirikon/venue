#!/usr/bin/env bash
set -euo pipefail

export POETRY_VIRTUALENVS_IN_PROJECT=true
poetry install
