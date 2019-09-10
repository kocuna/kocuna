#!/bin/sh

docker build -t kocuna/app:latest -t kocuna/app:$CIRCLE_SHA1 -f ./apps/app/Dockerfile .
docker build -t kocuna/api:latest -t kocuna/api:$CIRCLE_SHA1 -f ./apps/api/Dockerfile .

docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

docker push kocuna/app:latest
docker push kocuna/app:$CIRCLE_SHA1

docker push kocuna/api:latest
docker push kocuna/api:$CIRCLE_SHA1
