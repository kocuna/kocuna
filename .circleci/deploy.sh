#!/bin/sh


kubectl apply -f k8s
kubectl set image deployments/app-deployment app=kocuna/app:$CIRCLE_SHA1
kubectl set image deployments/api-deployment api=kocuna/api:$CIRCLE_SHA1
