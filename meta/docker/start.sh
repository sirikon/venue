#!/usr/bin/env bash
set -euo pipefail

./meta/docker/build.sh
docker run -it --rm --publish 127.0.0.1:8000:80 venue:dev
