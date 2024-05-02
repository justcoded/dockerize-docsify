# Sitemap

This document outlines the basic approach to `sitemap.xml`.

---

<!-- TOC -->

-   [Sitemap](#sitemap)
    -   [Base Approach](#base-approach)
    -   [How to See Local Sitemap](#how-to-see-local-sitemap)

<!-- TOC -->

---

## Base Approach

All sitemaps are loaded from the `API` via proxy (`configs/nginx/default.conf.template.example`):

```nginx
location ~ ^/((.*?)sitemap.xml)$ {
    proxy_pass ${VUE_APP_STORAGE_URL}/$1;
    break;
}
```

The **XSLT stylesheet** (`app/public/main-sitemap.xsl`) transform `XML sitemaps` into `HTML` for
display. It includes templates for handling sitemap indexes, URL sets, alternate links, images, and
videos.

The `sitemap` is available at `${VUE_APP_BASE_URL}/sitemap.xml`.

Sitemap styles are located at `app/public/main-sitemap.xsl`.

## How to See Local Sitemap

Docker cannot resolve local domain names. To access the local sitemap, register the connection on
the `storage api` via an `ip` address. Change the value for the `VUE_APP_STORAGE_URL` variable in
the `.env` file.

For example:

```dotenv
VUE_APP_STORAGE_URL=https://172.18.0.1:8010/storage/webapp
```

After updating the environment variable, the changes will be automatically applied after restarting
the stack:

```bash
make stop
make run
```

The `sitemap` is available at `${VUE_APP_BASE_URL}/sitemap.xml`.
