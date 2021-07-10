FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

WORKDIR /home/node/app

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY ./src/ /home/node/app

RUN npm install -g @nestjs/cli@^8 npm typeorm pg

RUN npm install

RUN mkdir -p /home/node/app/dist && chown node /home/node/app/dist

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]

