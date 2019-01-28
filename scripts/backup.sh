#!/bin/bash

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"
source ./variables.sh
cd ..

# Set a mark for current date
echo "" >> ./scripts/backup.log
echo "=======================" >> ./scripts/backup.log
date >> ./scripts/backup.log
echo "=======================" >> ./scripts/backup.log

# Export
mkdir -p backup
docker exec $(docker-compose ps -q db) pg_dump -U postgres eventtoolbox > ./backup/eventtoolbox.sql

# Do the backup
restic backup ./backup >> ./scripts/backup.log 2>&1
