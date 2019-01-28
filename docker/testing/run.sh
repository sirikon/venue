#!/bin/sh

set -e

docker-compose up -d --build
docker exec $(docker-compose ps -q app) npm run lint
docker exec $(docker-compose ps -q app) npm run migrate
docker exec $(docker-compose ps -q app) npm test
docker-compose down
