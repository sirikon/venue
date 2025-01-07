#!/usr/bin/env bash
set -euo pipefail

docker build \
  -t "${VENUE_TAG:-"venue:dev"}" \
  --build-arg "VENUE_VERSION=${VENUE_VERSION:-"dev"}" \
  --build-arg "PYTHON_VERSION=$(grep python <.tool-versions | sed -E 's/^python (.*)$/\1/g')" \
  --build-arg "POETRY_VERSION=$(grep poetry <.tool-versions | sed -E 's/^poetry (.*)$/\1/g')" \
  --file "$(dirname "${BASH_SOURCE[0]}")/_/Dockerfile" \
  .
