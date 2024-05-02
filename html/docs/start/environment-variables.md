# Environment Variables

---

<!-- TOC -->

-   [Environment Variables](#environment-variables)
    -   [Adding Env Vars](#adding-env-vars)
        -   [Define Variable](#define-variable)
        -   [Configure Nginx](#configure-nginx)
        -   [Configure Docker Compose](#configure-docker-compose)
        -   [Restart](#restart)
    -   [Updating Env Var](#updating-env-var)

<!-- TOC -->

---

This document outlines the basic procedure to access environment variables in JavaScript runtime.

## Adding Env Vars

### Define Variable

To add environment variables, use the format `VARIABLE_NAME=variable_value` and specify the desired
values in the `.env.example` (and `.env` if you already init the project with `make init-dev`). For
example:

```dotenv
VUE_APP_BASE_URL=https://webapp.lenderkit.pro:8080
```

### Configure Nginx

-   Open the NGINX configuration file located at `configs/nginx/default.conf.template.example` (and
    `configs/nginx/default.conf.template` if you already init the project with `make init-dev`).
-   Locate the configuration block for the `/environment.js` route.

```nginx
location ^~ /environment.js {
    default_type application/javascript;

    return 200 'const environment = {
        "VUE_APP_BASE_URL": "${VUE_APP_BASE_URL}",
        "VUE_APP_API_BASE_URL": "${VUE_APP_API_BASE_URL}",
        "VUE_APP_STORAGE_URL": "${VUE_APP_STORAGE_URL}",
        "VUE_APP_ENV": "${VUE_APP_ENV}"
    }';

    break;
}
```

-   Add the desired variables to the environment constant.

### Configure Docker Compose

-   Add variables to the `environment` section in the `docker-compose.example.yml` (and
    `docker-compose.yml` if you already init the project with `make init-dev`).

```yaml
environment:
    PRERENDER_PROXY_HOST: ${PRERENDER_PROXY_HOST}
    PRERENDER_REWRITE_RULE: ${PRERENDER_REWRITE_RULE}
    PRERENDER_TOKEN: ${PRERENDER_TOKEN}
    VUE_APP_ENV: ${VUE_APP_ENV}
    VUE_APP_BASE_URL: ${VUE_APP_BASE_URL}
    VUE_APP_API_BASE_URL: ${VUE_APP_API_BASE_URL}
    VUE_APP_STORAGE_URL: ${VUE_APP_STORAGE_URL}
```

### Restart

After making these changes, execute the `make run` command.

Once the environment variables are set up and the necessary configurations are in place, the web
application can access these variables as properties of the `environment` object.

## Updating Env Var

After updating the environment variables, the changes will be automatically applied after restart
the stack:

```bash
make stop
make run
```
