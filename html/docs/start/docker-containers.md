# Docker Containers

If you run `make init-dev` and keep default configuration inside `docker-compose.yml` and
`docker-compose.override.yml`, after run you will have such containers:

-   `webapp-nginx` - the web-server to serve app static built dist files and processes server api
    requests and forwards them to api node.js server application
-   `webapp-app` - the application itself
-   `webapp-prerender` - the prerender service to render pages for SEO robots
-   `webapp-prerender-cache` - the prerender service storage
-   `webapp-docsify` - the documentation server

## Containers Access

To open the shell of the running container (for example, `webapp-nginx`) you need to run `bash`
command on it:

`docker-compose exec -w /var/www/html {service} bash`

For **node.js** you can't use `exec`, because it's not running by default.
