#!/bin/sh


kubectl apply -f k8s
kubectl set image deployements/app-deployement app=kocuna/app:$CIRCLE_SHA1
kubectl set image deployements/api-deployement api=kocuna/api:$CIRCLE_SHA1
