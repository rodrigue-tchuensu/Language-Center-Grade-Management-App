
FROM nginx:1.17.0-alpine

MAINTAINER Rodrigue Tchuensu P. <pouopse@yahoo.fr>



RUN rm  /usr/share/nginx/html/*

COPY conf/default.conf /etc/nginx/conf.d/

COPY /app/build/ /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]