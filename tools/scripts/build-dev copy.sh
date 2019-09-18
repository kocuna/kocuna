#!/bin/sh

rm -rf tempEntitiesFolder;
mkdir tempEntitiesFolder;
typeorm-model-generator -h localhost -d postgres -p 5432 -u postgres -e postgres --output ./tempEntitiesFolder;
rm -rf apps/api/src/app/entities;
cp tempEntitiesFolder/entities apps/api/src/app/;
rm -rf tempEntitiesFolder;
