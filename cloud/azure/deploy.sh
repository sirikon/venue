#!/usr/bin/env bash

az group create -l $LOCATION -n $RESOURCE_GROUP

export DEPLOYMENT_NAME=${NAME}_$(date +"%Y-%m-%d_%H-%M-%S")

az group deployment create \
    --name $DEPLOYMENT_NAME \
    --resource-group $RESOURCE_GROUP \
    --template-file ./template.json \
    --parameters \
        "name=$NAME" \
        "location=$LOCATION" \
        "databaseUser=$DATABASE_USER" \
        "databasePassword=$DATABASE_PASSWORD"
