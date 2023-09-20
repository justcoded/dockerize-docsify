FROM nginx:latest

COPY ./html/ /usr/share/nginx/html/
COPY ./templates/ /etc/nginx/templates/

ENV OPT_INDEX_TITLE Documentation
ENV OPT_DOCSIFY_CONF ''
ENV OPT_PLUGIN_FOLDER_RELATED_LINKS false
