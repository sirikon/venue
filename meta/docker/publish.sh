#!/usr/bin/env bash
set -euo pipefail

VENUE_VERSION="$(date -u '+%Y%m%d_%H%M%S')"
VENUE_TAG="ghcr.io/sirikon/venue:${VENUE_VERSION}"
export VENUE_TAG
"$(dirname "${BASH_SOURCE[0]}")/build.sh"
docker push "$VENUE_TAG"
