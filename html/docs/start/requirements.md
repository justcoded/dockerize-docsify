# Requirements

We assume that you have read **Before you start** section and you're acknowledged about what Docker,
Vagrant and Makefile are.

## Host requirements

The system is installed and tested on Ubuntu LTS releases (20.04 / 22.04).

Requirements:

-   GNU Bash v5+ (`bash --version`)
-   GNU Make v4+ (`make --version`)
-   Docker 20+ (Community, NOT docker.io), (`docker version`)
-   Docker Compose 1.29 (`docker-compose version`)
    -   or Docker Compose 2.6+ plugin with
        [docker compose switch](https://github.com/docker/compose-switch).

### Docker Setup

-   To install Docker CE you can follow the official documentation:
    [Docker Community Edition installation for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
-   Your user should be added to the `docker` group. Do not run docker as a superuser!
    ([Executing Docker without Sudo](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04#step-2-%E2%80%94-executing-the-docker-command-without-sudo-optional))

### Docker Compose

-   The up-to-date version is v2.6+, you can follow official documentation:
    [Install docker compose](https://docs.docker.com/compose/install/linux/).
-   However, it's required to install
    [docker compose switch](https://github.com/docker/compose-switch) to fallback to v1 syntax.

### Make util

-   Make sure you have `make` util installed

```bash
make --version
```

## MacOS

!> **OUTDATED, not tested with M1 processors**

If you want to install project on MacOS, you will need to install some additional software:

-   **XCode and XCode CLI** - Provides additional command line tools and required by Homebrew
-   **Homebrew** - CLI software package manager
-   **Bash** 5.x (up-to-date GNU bash version)
-   **Virtual Box**
-   **Vagrant**

### XCode

-   Download XCode from App Store (it will take time)
-   [Install XCode Command Line Tools](https://railsapps.github.io/xcode-command-line-tools.html)

### Homebrew

-   Install [Homebrew](https://brew.sh/)

### Bash

By default MacOS X uses GNU Bash 3.2, which is outdated. Up to date version is 5.x. This means you
can't use modern features same as linux. We use some bash scripts to make installation process more
smooth, so you will need up-to-date bash to run all scripts correctly.

Follow the [instructions](https://itnext.io/upgrading-bash-on-macos-7138bd1066ba) to setup bash 5.x.

### Vagrant

-   Install
    [Vagrant and Virtual Box with Homebrew](https://medium.com/@JohnFoderaro/macos-sierra-vagrant-quick-start-guide-2b8b78913be3)
-   Place `Vagrantfile` from **[this snippet](https://bitbucket.org/snippets/justcoded/n7zpkB)** to
    a folder with all your projects.  
    Read snippet Readme on how to run Vagrant.
-   ALL commands for installation process should be run inside Vagrant SSH (except very little
    amount of commands, which are marked as NOT be executed under Vagrant)

### Make util

-   Check that you have `make` util available (it should be available after XCode CLI installed)

```bash
make -h
```
