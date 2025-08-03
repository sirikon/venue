#!/usr/bin/env bash
set -euo pipefail

./.venv/bin/ruff check --fix
./.venv/bin/ruff format
