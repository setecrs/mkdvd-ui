FROM node:8.4.0-alpine as build

WORKDIR /usr/local/src/ipedqueue-path-ui

RUN npm i -g yarn
COPY package.json .
COPY yarn.lock .
RUN yarn

ADD . .

RUN npm run build

FROM nginx:1.17.0-alpine
COPY --from=build /usr/local/src/ipedqueue-path-ui/build /usr/local/src/ipedqueue-path-ui/build
RUN echo $'http {\n\
    server{\n\
        listen 80;\n\
        location ~ \\.css {\n\
            include  /etc/nginx/mime.types;\n\
            add_header  Content-Type    text/css;\n\
            root /usr/local/src/ipedqueue-path-ui/build ;\n\
        }\n\
        location ~ \\.js {\n\
            include  /etc/nginx/mime.types;\n\
            add_header  Content-Type    application/x-javascript;\n\
            root /usr/local/src/ipedqueue-path-ui/build ;\n\
        }\n\
        location / {\n\
            include  /etc/nginx/mime.types;\n\
            add_header Service-Worker-Allowed / ;\n\
            root /usr/local/src/ipedqueue-path-ui/build ;\n\
            index index.html ;\n\
        }\n\
    }\n\
}\n\
' > /etc/nginx/nginx.conf