FROM node:16-alpine as node

WORKDIR /ui

COPY ui/package.json .
COPY ui/package-lock.json .

RUN npm install

COPY ui .

RUN npm run build

FROM nginx:latest

COPY ui/nginx.conf /etc/nginx/nginx.conf
COPY --from=node /ui/dist/ui /usr/share/nginx/html
