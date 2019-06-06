FROM node:12.2.0-alpine as build

WORKDIR /usr/local/src/

RUN npm i -g yarn
COPY package.json .
COPY yarn.lock .
RUN yarn

ADD . .

ENV REACT_APP_APIURL="__REACT_APP_APIURL__"
RUN yarn build

FROM nginx:1.17.0-alpine
COPY --from=build /usr/local/src/build /usr/local/src/build
RUN echo $'\
events { worker_connections 1024; }\n\
http {\n\
    server{\n\
        listen 80;\n\
        error_page 404 /index.html;\n\
        location ~ \\.css {\n\
            include  /etc/nginx/mime.types;\n\
            add_header  Content-Type    text/css;\n\
            root /usr/local/src/build ;\n\
        }\n\
        location ~ \\.js {\n\
            include  /etc/nginx/mime.types;\n\
            add_header  Content-Type    application/x-javascript;\n\
            root /usr/local/src/build ;\n\
        }\n\
        location / {\n\
            include  /etc/nginx/mime.types;\n\
            add_header Service-Worker-Allowed / ;\n\
            root /usr/local/src/build ;\n\
            index index.html ;\n\
        }\n\
    }\n\
}\n\
' > /etc/nginx/nginx.conf

RUN echo '#!/bin/sh' $'\n\
set -e\n\
sed -ie "s|__REACT_APP_APIURL__|$REACT_APP_APIURL|g" /usr/local/src/build/static/js/*.js\n\
exec "$@"' > /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]