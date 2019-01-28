#!/bin/bash

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"
cd ..

docker-compose up -d --build
docker exec $(docker-compose ps -q app) npm run migrate
