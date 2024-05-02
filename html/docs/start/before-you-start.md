# Before you start

Before you start working with the code you need to make sure you understand some technologies or
tools were used to install this project.

You should be familiar with:

-   Basic Linux knowledge
-   Docker and Docker Compose
-   GNU Make utility

## Docker

The best way to learn Docker is to read the
[official documentation](https://docs.docker.com/engine/docker-overview/) and experiment with it on
your own. You will also need to know how to use [Docker Compose](https://docs.docker.com/compose/).

You can also search the web for simplified explanations or demo videos like these resources:

-   [Docker Tutorial for Beginners - A Full DevOps Course on How to Run Applications in Containers](https://www.youtube.com/watch?v=fqMOX6JJhGo)
-   [Docker Simplified: A Hands-On Guide for Absolute Beginners](https://www.freecodecamp.org/news/docker-simplified-96639a35ff36/)

### Super basic Docker intro

In a few words (this is completely wrong, but just for quick understanding) - think about Docker
container as a separate Linux-based server, which has some pre-installed software.

To set up your application you usually take some pre-defined images for each technology, launch them
as containers and join them into one network. So for each application you have several small
separate servers.

These servers are absolutely independent of the external Host system, to make these "servers" see
your local files, you need to mount files (or folders) as a separate volume.

So to use some software or operate with it you need to GET INSIDE the container (open container
bash).

## GNU Make

Initially GNU Make util is used to build executable programs from a source code. You can read more
in [Wikipeida](<https://en.wikipedia.org/wiki/Make_(software)>). However, it is also used to
automatisation some complex processes and simplify CLI usage to running few simple commands. The
main advantage of the Make util - it's already installed in almost any Linux distribution and you
don't need any additional requirements.

Please read this [simple guide](https://opensource.com/article/18/8/what-how-makefile) to get a
better understanding of a Makefile.

To simplify project installation/running/updating/routing we use GNU Make util and pre-defined
Makefile's. To see the full list of available commands you can run `make help`.

## Vagrant (for MacOS users)

If you're working on MacOS, we strongly recommend to install the Virtual Box and Vagrant to run
Docker inside the Linux Virtual Machine (VM). (Read more in [Requirements](requirements.md) section
on how to set it up)

Of course, you can use "Docker for Mac", but you can struggle with different issues, especially on
M1 processors. Furthermore, Docker for Mac has known speed problems and you will have serious speed
issues running project directly on Mac without the VM.

So please take your time to know what the [VirtualBox](https://www.virtualbox.org/) is and what the
[Vagrant](https://www.vagrantup.com/) is.
