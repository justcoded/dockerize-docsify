FROM nginx:latest

COPY ./html/ /usr/share/nginx/html/
COPY ./templates/ /etc/nginx/templates/

ENV OPT_INDEX_TITLE Documentation
