#!/usr/bin/env bash
set -euo pipefail

docker build -t venue:dev --file meta/_docker/Dockerfile .
