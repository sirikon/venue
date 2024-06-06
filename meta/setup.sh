#!/usr/bin/env bash
set -euo pipefail

./meta/install.sh
./meta/devenv.sh down --volumes
./meta/devenv.sh up --detach --wait
./meta/manage.sh migrate
./meta/manage.sh createsuperuser --skip-checks --username admin --email ''
