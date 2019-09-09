#!/bin/sh

echo $GCLOUD_SERVICE_KEY | gcloud auth activate-service-account --key-file=-
gcloud --quiet config set project ${GOOGLE_PROJECT_ID}
gcloud --quiet config set compute/zone ${GOOGLE_COMPUTE_ZONE}
gcloud container clusters get-credentials ${GOOGLE_CLUSTER_NAME}

# docker build -t kocuna/api -f ./apps/api .
