# Matching Web Security Guidelines

The LenderKit code is written by the latest security guidelines and it has already included
server-side XSS, Injections, etc. protection.

Furthermore, you can improve your application security by providing additional HTTP Headers from the
web server, which provides additional instructions to the web browser to prevent dangerous actions.
You can learn [here](https://infosec.mozilla.org/guidelines/web_security) about different headers
you can use to improve the security.

By default, the web server configuration **already includes**:

-   gzip content for faster transfer
-   content expiration headers by mime type
-   `Strict-Transport-Security`, `X-Content-Type-Options` and `X-XSS-Protection` HTTP headers

### WebApp CSP headers

WebApp CSP headers are configured within nginx server configuration template file
`configs/nginx/default.conf.template.example`. For local development you need to update original
template file as well `configs/nginx/default.conf.template`.

`map` directive is used to generate dynamic variables for API and Storage URLs from
`VUE_APP_API_BASE_URL` and `VUE_APP_STORAGE_URL` environment variables. These directives provide
`$csp_api_domain` and `$csp_storage_domain` variables, which are used in CSP headers.

After that there is a set of variables declarations for each CSP directive, which are used to
combine all CSP rules in one header.

```nginx
    set $csp_basic "default-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'";
    set $csp_connect "connect-src 'self' sentry.justcoded.com *.sentry.io *.googleapis.com *.google-analytics.com $csp_api_domain $csp_storage_domain randomuser.me";
    set $csp_script "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googleapis.com *.google.com *.gstatic.com *.googletagmanager.com *.google-analytics.com $csp_api_domain $csp_storage_domain";
    set $csp_style "style-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com *.google.com *.googletagmanager.com $csp_api_domain $csp_storage_domain";
    set $csp_font "font-src 'self' data: fonts.gstatic.com";
    set $csp_img "img-src * data:";
    set $csp_media "media-src 'self'";
    set $csp_frame "frame-src 'self' *.google.com *.gstatic.com youtube.com *.youtube.com youtu.be *.youtu.be vimeo.com *.vimeo.com *.jumio.ai *.docusign.com *.docusign.net";
    set $csp_frame_ancestors "frame-ancestors $csp_api_domain";

    add_header Content-Security-Policy "$csp_basic;$csp_connect;$csp_script;$csp_style;$csp_font;$csp_img;$csp_media;$csp_frame;$csp_frame_ancestors" always;``
```
