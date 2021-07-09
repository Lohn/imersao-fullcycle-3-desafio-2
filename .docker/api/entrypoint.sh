#!/bin/bash

if [ ! -f ".env" ]; then
    cp .env.example .env
fi

npm install
npx typeorm migration:run
npm run start:dev