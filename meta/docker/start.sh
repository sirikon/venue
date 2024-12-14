#!/usr/bin/env bash
set -euo pipefail

"$(dirname "${BASH_SOURCE[0]}")/build.sh"
docker run \
  -it --rm \
  -e VENUE_SECRET_KEY=secret-secret-secret-secret-secret-secret-secret-secret \
  -e VENUE_DISABLE_SECURE_COOKIES=true \
  -e VENUE_PORT_PREFIX=80 \
  -v ./.workdir:/w \
  --network host \
  venue:dev "$@"
