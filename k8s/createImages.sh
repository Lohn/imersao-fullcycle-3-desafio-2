#!/bin/bash
PREFIX=imersao-fullcycle-3-desafio-2
DOCKER_USER=jlohn
if [ "x$1" != "-no-src" ] ; then
    rm -rf src
    rm -rf .docker/api/src
    rm -rf .docker/next/src
    git clone --depth 1 git@github.com:Lohn/imersao-fullcycle-3-desafio-2.git src
    mv src/api .docker/api/src
    mv src/next .docker/next/src
fi
docker build .docker/api -t ${DOCKER_USER}/${PREFIX}-api
docker build .docker/next -t ${DOCKER_USER}/${PREFIX}-next
docker push ${DOCKER_USER}/${PREFIX}-api
docker push ${DOCKER_USER}/${PREFIX}-next