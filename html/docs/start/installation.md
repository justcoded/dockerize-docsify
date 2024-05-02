# Installation

## Installation helpers

To simplify docker operations, installation/updating process the project uses
[GNU Make](<https://en.wikipedia.org/wiki/Make_(software)>) util, configured inside Makefile's.
Makefile contains "targets" - a predefined set or "rules" (commands) to be executed.

You can run `make help` to get the list of available operations:

```bash
make help
```

There are **2 Makefile's** in the project:

-   `/Makefile` or **root level Makefile**.  
    This file contains targets to configure your server environment and operates with Docker
    containers. This one should be called **outside** any Docker container (If you're on Mac -
    inside Vagrant CLI).
-   `/app/Makefile` or **application level Makefile**.  
    This file contains targets to operate with your JavaScript application. It should be called
    **inside Node.js container** (webapp-app). `/app` folder is mounted as a docroot `/var/www/html`
    to docker node.js containers, so it's the only available Makefile inside the containers. In
    general this Makefile contains application install/update scripts calls.

## Quick install

To init docker containers and run LenderKit project you can use root level Makefile to do everything
for you.

> :rotating_light: First you need to do a docker login to the
> [private docker hubs](https://hub.jcdev.net) with your own username/password (ask Server
> Administrator for it).
>
> -   `docker login hub.jcdev.net:24000`

### 0. Clone/Download

-   Download project source to some folder

```bash
git clone {repository-url} ./project-folder
```

### 1. Init your environment

After the download you have to init the project with your own environments `/.env` file,
docker-compose files and nginx server config.

To copy all necessary files and get information where you can find your local configs run:  
_\* We recommend to run this command in your original OS, and NOT inside Vagrant VM if you have Mac
OS._

```bash
make init-dev
```

By default, **you have the working configuration files** and the only thing you should check is the
API/Storage URLs to connect to.

**Environment variables**

Inside docker `/.env` file you can configure:

-   `VUE_APP_BASE_URL` - the base URL of your application.
-   `VUE_APP_API_BASE_URL` - the API base URL to connect and work with. Usually looks like
    https://lenderkit-project.com/v1.
-   `VUE_APP_STORAGE_URL` - the Public storage URL to get static resources from (like configured
    favicons, logos, robots.txt). For built-in drive storages usually looks like
    https://lenderkit-project.com/storage/webapp.

Additionally, you can configure local port you want to access webapp from:

-   `HOST_WEB_PORT` - configuration of external mapped ports to the nginx server

#### SSH RSA

Furthermore, to successfully download private core repository you will need Private RSA key, which
is configured inside your BitBucket and GitHub accounts (you must configure SSH connect to your
[BitBucket Account](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html) and
[GitHub Account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)).

> :rotating_light: **Important**: Your RSA key should NOT have a passphrase!

Once you configured your SSH key and checked that it works (clone this repository using SSH option),
you need to copy your private RSA key to `runtime` folder and reset its permissions to 644.

If you used the standard name `id_rsa`, then you can just call a make command:  
_\* You have to run this command in your original OS and NOT inside Vagrant VM if you have Mac OS._

```bash
make init-rsa
```

If you have a custom name, then use this command:

```bash
cp -f /PATH/TO/PRIVATE/KEY ./runtime/id_rsa && chmod 644 ./runtime/id_rsa
```

**Docker compose**

There are 2 docker-compose main files:

-   `docker-compose.example` which is copied as `/docker-compose.yml`
-   `build/docker-compose.starter.yml` which is copied as `/docker-compose.override.yml` and merged
    automatically by docker compose utility. This file contains special configuration for
    development environment (like watch poll mode, extra volumes, etc.)  
    _In case "webapp-dev" installation `build/docker-compose.webappdev.yml` is copied instead._

After you init your environment variables and configure your required ports (inside `.env`,
`docker-compose.yml` and `configs/nginx-server.conf`) you can do a test-run to check that your
docker-compose configuration is correct:

### 2. Installing LenderKit

To install the project after `init` and RSA key configuration, run:

```bash
make install
```

After installation, it will launch nginx container automatically pointed to the production dist
files.  
Your site will be available at http://anything-pointing-to-localhost:8080  
(for example: http://localhost:8080).

**WebServer configuration**

For proper work of the LenderKit based project you have to point nginx to `dist/html` folder, which
is created upon installation process.

This folder has .web.conf file, which should be included in your nginx host configuration to support
error pages like 404, etc.

**If you run project with docker, this is configured already.**

### 3. Site Domain and Access

#### WebApp

On localhost, you need to point your project domain to a localhost inside `/etc/hosts` file. By
default, domain is `webapp.lenderkit.pro`, so you need to add this to your hosts file (for Mac
users - run in your terminal, NOT Vagrant):

```bash
sudo bash -c 'echo "127.0.0.1 webapp.lenderkit.pro" >> /etc/hosts'
# next one is required only if you have local LenderKit API installation
sudo bash -c 'echo "127.0.0.1 lenderkit.pro" >> /etc/hosts'
```

_or just edit this file with editor: `sudo nano /etc/hosts`_

By default, site is accessible within such URLs:

-   https://webapp.lenderkit.pro:8080
