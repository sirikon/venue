#!/usr/bin/env bash

# Resource Group name in which the deployment will be
# done. If it doesn't exist, will be created.
export RESOURCE_GROUP=""

# Name of the deployment (lowercase) (for example: myevent)
export NAME=""

# Azure Location.
# Get available locations with `az account list-locations -o table`
export LOCATION=""

# Username and password for PostgreSQL database
export DATABASE_USER=""
export DATABASE_PASSWORD=""
