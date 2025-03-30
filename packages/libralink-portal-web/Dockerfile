FROM --platform=linux/amd64 nginx:latest

COPY ./nginx/.htpasswd /etc/nginx/.htpasswd
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html