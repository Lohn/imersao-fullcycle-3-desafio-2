#!/bin/bash


dockerize -wait tcp://${TYPEORM_HOST}:${TYPEORM_PORT} -timeout 300s sleep 10

echo Configuring api server
echo Starting migration...
npm run typeorm migration:show
npm run typeorm migration:run
echo Starting server...
npm run start