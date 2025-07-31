#!/usr/bin/env bash
set -euo pipefail

(
  cd tests/e2e
  npm install
)
./meta/e2e/playwright.sh install
