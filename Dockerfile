FROM node:8.4.0-alpine

WORKDIR /usr/local/src/microservices-path-ui

RUN npm i -g yarn
COPY package.json .
COPY yarn.lock .
RUN yarn

ADD . .

RUN npm run build

VOLUME /usr/local/src/microservices-path-ui
CMD /bin/true
