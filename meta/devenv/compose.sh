#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/_/compose/venue-devenv"
exec docker compose "$@"
