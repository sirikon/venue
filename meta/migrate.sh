#!/usr/bin/env bash
set -euo pipefail

cd src
../.venv/bin/python manage.py migrate
