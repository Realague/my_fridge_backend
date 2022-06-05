#!/bin/bash -e

# AWS registry uri
REGISTRY_URL="public.ecr.aws/p6l5e0y8/my_fridge_backend/services"
TARGET_IMAGE_DEVELOP="${REGISTRY_URL}:develop"
TARGET_IMAGE_DEVELOP_TAG="${REGISTRY_URL}:develop-${TRAVIS_COMMIT}"
TARGET_IMAGE_VERSIONED="${REGISTRY_URL}:${TRAVIS_TAG}"

# Push image to ECR
###################
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/p6l5e0y8

if [[ -n "${TRAVIS_TAG}" && "${TRAVIS_BRANCH}" == "master" ]]
then
  # push new version
  docker tag "${IMAGE_NAME}" "${TARGET_IMAGE_VERSIONED}"
  docker push "${TARGET_IMAGE_VERSIONED}"
else
  # update create a tag version
  docker tag "${IMAGE_NAME}" "${TARGET_IMAGE_DEVELOP_TAG}"
  docker push "${TARGET_IMAGE_DEVELOP_TAG}"
  # update develop version
  docker tag "${IMAGE_NAME}" "${TARGET_IMAGE_DEVELOP}"
  docker push "${TARGET_IMAGE_DEVELOP}"
fi
