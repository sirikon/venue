#!/usr/bin/env bash

az group create -l $LOCATION -n $RESOURCE_GROUP

export DEPLOYMENT_NAME=${NAME}_registry_$(date +"%Y-%m-%d_%H-%M-%S")

az group deployment create \
    --name $DEPLOYMENT_NAME \
    --resource-group $RESOURCE_GROUP \
    --template-file ./template-registry.json \
    --parameters \
        "name=$NAME" \
        "location=$LOCATION"
