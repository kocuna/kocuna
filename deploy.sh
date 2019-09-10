#!/bin/sh

docker build -t kocuna/app:latest -t kocuna/app:$CIRCLE_SHA1 -f ./apps/app/Dockerfile .
docker build -t kocuna/api:latest -t kocuna/api:$CIRCLE_SHA1 -f ./apps/api/Dockerfile .

docker push kocuna/app:latest
docker push kocuna/app:$CIRCLE_SHA1

docker push kocuna/api:latest
docker push kocuna/api:$CIRCLE_SHA1

kubectl apply -f k8s
kubectl set image deployements/app-deployement api=kocuna/app:$CIRCLE_SHA1
kubectl set image deployements/api-deployement api=kocuna/api:$CIRCLE_SHA1
