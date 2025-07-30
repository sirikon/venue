#!/usr/bin/env bash
set -euo pipefail

./meta/poetry.sh update
./meta/e2e/update-dependencies.sh
./meta/perf/update-dependencies.sh
