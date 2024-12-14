#!/usr/bin/env bash
set -euo pipefail

docker build \
  -t "${VENUE_TAG:-"venue:dev"}" \
  --file "$(dirname "${BASH_SOURCE[0]}")/_/Dockerfile" \
  .
