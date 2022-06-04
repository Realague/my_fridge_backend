#!/bin/bash -e

# AWS registry uri
REGISTRY_URL=public.ecr.aws/p6l5e0y8/my_fridge_backend/services
TARGET_IMAGE_LATEST="${REGISTRY_URL}:latest"
TARGET_IMAGE_VERSIONED="${REGISTRY_URL}:${TRAVIS_TAG}"

# Push image to ECR
###################
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/p6l5e0y8

if [ ! -z "${TRAVIS_TAG}" ]
then
  # push new version
  docker tag ${IMAGE_NAME} ${TARGET_IMAGE_VERSIONED}
  docker push ${TARGET_IMAGE_VERSIONED}
fi
else
  # update latest version
  docker tag ${IMAGE_NAME} "${REGISTRY_URL}:latest"
  docker push "${REGISTRY_URL}:latest"
fi