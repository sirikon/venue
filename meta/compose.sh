#!/usr/bin/env bash
set -euo pipefail

cd meta/_devenv/compose/venue-devenv
docker compose "$@"
