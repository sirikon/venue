#!/usr/bin/env bash
set -euo pipefail

./meta/install.sh
./meta/devenv/compose.sh down --volumes
./meta/devenv/compose.sh up --detach --wait
./meta/manage.sh migrate
export DJANGO_SUPERUSER_USERNAME=admin
export DJANGO_SUPERUSER_PASSWORD=admin
export DJANGO_SUPERUSER_EMAIL=''
./meta/manage.sh createsuperuser --skip-checks --no-input
mkdir -p .workdir/serve
cp -r ./meta/_devenv/media .workdir/serve
./meta/manage.sh loaddata devenv
