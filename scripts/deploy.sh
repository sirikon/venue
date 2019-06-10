#!/bin/bash

set -e

docker-compose up -d --build
docker exec $(docker-compose ps -q app) npm run migrate
