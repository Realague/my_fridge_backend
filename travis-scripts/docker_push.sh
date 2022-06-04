#!/bin/bash -e

# AWS registry uri
REGISTRY_URL=public.ecr.aws/p6l5e0y8/my_fridge_backend/services
SOURCE_IMAGE="${DOCKER_REPO}"
# using it as there will be 2 versions published
TARGET_IMAGE="${REGISTRY_URL}"
#${DOCKER_REPO}
# lets make sure we always have access to latest image
TARGET_IMAGE_LATEST="${TARGET_IMAGE}:latest"
TIMESTAMP=$(date '+%Y%m%d%H%M%S')
# using datetime as part of a version for versioned image
VERSION="${TIMESTAMP}-${TRAVIS_COMMIT}"
# using specific version as well
# it is useful if you want to reference this particular version
# in additional commands like deployment of new Elasticbeanstalk version
TARGET_IMAGE_VERSIONED="${TARGET_IMAGE}:${VERSION}"

# Push image to ECR
###################
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/p6l5e0y8

# update latest version
docker tag ${SOURCE_IMAGE} "${REGISTRY_URL}:latest"
docker push "${REGISTRY_URL}:latest"

# push new version
#docker tag ${SOURCE_IMAGE} ${TARGET_IMAGE_VERSIONED}
#docker push ${TARGET_IMAGE_VERSIONED}
