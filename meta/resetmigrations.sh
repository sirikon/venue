#!/usr/bin/env bash
set -euo pipefail

rm -rf src/venue/migrations
./meta/manage.sh makemigrations venue
