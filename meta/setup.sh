#!/usr/bin/env bash
set -euo pipefail

./meta/install.sh
./meta/devenv.sh down --volumes
./meta/devenv.sh up --detach --wait
./meta/manage.sh migrate
export DJANGO_SUPERUSER_USERNAME=admin
export DJANGO_SUPERUSER_PASSWORD=admin
export DJANGO_SUPERUSER_EMAIL=''
./meta/manage.sh createsuperuser --skip-checks --no-input
