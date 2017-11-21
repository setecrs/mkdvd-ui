FROM node:8.4.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm i -g yarn
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn

ADD . /usr/src/app

RUN npm run build

VOLUME /usr/src/app/build/
