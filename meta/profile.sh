#!/usr/bin/env bash
set -euo pipefail

# shellcheck disable=SC1091
source "./meta/_/env.sh"

export PYTHONPATH="src"
exec ./.venv/bin/pyinstrument -r html "$@"
