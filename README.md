# Docsify docker image
## About
This is docker image to fast start with docsify markdown docs viewer.

It's based on nginx docker image.

## Quick start
Just launch the container to see it in action
```
docker run --name docsify-example -d -p 8080:80 justcoded/
docsify:latest
```
Access the demo page on 127.0.0.1:8080.

## Display your docs
Just mount your docs folder to /usr/share/nginx/html/docs.

Special files you may want to create:

_sidebar.md - Left nav

_navbar.md - Top nav
## Docker compose example
```
---
version: '3.7'
services:
  docsify:
    image: justcoded/docsify:latest
    volumes:
        - ./docs/:/usr/share/nginx/html/docs
    ports:
      - 8080:80
```

## Configurations
### Custom docsify config
If you want custom config you can override /usr/share/nginx/html/assets/docsify.conf.js with your mounted file.

Alternatively, you can set env variable with json to override the config:
```
    ...
    environment:
        OPT_DOCSIFY_CONF: "{subMaxLevel: 3}"
```        
### Custom page title
To specify custom page title on page load you can use env variable:
```
    ...
    environment:
      OPT_INDEX_TITLE: My custom page title
```    
