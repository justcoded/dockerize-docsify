# Makefiles reference

As we have already mentioned there are Makefiles:

-   `/Makefile` or **root level Makefile**. This file contains targets to configure your server
    environment and operate with Docker containers. This one should be called **outside** any Docker
    container (If you're on Mac - inside Vagrant SSH).
-   `/app/Makefile` or **application level Makefile**. This file contains targets to operate with
    your JavaScript application. It should be called inside Node containers (webapp-app). /app
    folder is mounted as a docroot /var/www/html to docker node.js containers, so it's the only
    available Makefile inside the containers. In general this Makefile contains application
    install/update scripts calls.

## Root level Makefile

### Docker Targets

**info:** Prints base available commands.

**init:** Initializes main config file like `.env`, `docker-compose.yml`, `nginx-server.conf`.

**init-dev:** _depends on `init`_ Initialize for development. Creates `docker-compose.override.yml`
file.

**init-rsa:** Copies the 'id_rsa' file to the project to mount inside the docker that's because
`npm` should have access to the private repositories

**install:** Runs full installation process in the required containers:

-   run `make install`
-   run npm install/npm build

**update:** Runs full update process

-   run `make update`
-   run npm install/npm build if not `SKIP_VENDORS` flag specified

**run:** Runs the application

**stop:** Stops containers and removes docker network

**chown:** Fixes file permissions for files created inside docker container (**should be run outside
the container or Vagrant**)

### Node.js Related Targets

**nodejs-bash:** Logins to the Node.js container

The following helpers are used in the `webapp-nginx` and `webapp-app` containers.

**npm-build:** Runs `npm run build` with node memory limit option.

**npm-multisite-build:** Builds the multisite

**npm-watch:** Runs build in watch mode with node memory limit option (`npm run watch`)

## Application level Makefile

### Docker Targets

**info:** Prints base available commands.

**install:** Installs dependencies, init core library

**update:** Updates after pull

**chmod:** Chmod important folders

**dotenv-init:** Creates .env file

**corelibrary-init:** Init the core library. It needs to develop the LenderKit core to replace
downloaded modules from the private repositories with local copies of the modules with usage of the
symlink.
