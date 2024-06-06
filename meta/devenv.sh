#!/usr/bin/env bash
set -euo pipefail

cd meta/compose/venue-devenv
docker compose "$@"
