#!/usr/bin/env bash
set -euo pipefail

cd tests/perf
exec k6 run "$@" src/test.ts
