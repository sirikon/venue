#!/usr/bin/env bash
set -euo pipefail

"$(dirname "${BASH_SOURCE[0]}")/build.sh"
docker run \
  -it --rm \
  --publish 127.0.0.1:8000:80 \
  -e VENUE_DEBUG=true \
  -e VENUE_PORT_PREFIX=80 \
  --network host \
  venue:dev "$@"
