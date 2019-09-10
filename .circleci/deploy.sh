#!/bin/sh


kubectl apply -f k8s
kubectl set image deployments/app-deployement app=kocuna/app:$CIRCLE_SHA1
kubectl set image deployments/api-deployement api=kocuna/api:$CIRCLE_SHA1
