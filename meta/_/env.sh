#!/usr/bin/env bash
set -euo pipefail

VENUE_ROOT="$(realpath "$(dirname "${BASH_SOURCE[0]}")/../..")"
export VENUE_ROOT
export VENUE_DEBUG="true"
export VENUE_FIXTURES="$VENUE_ROOT/meta/devenv/_/fixtures"
