---
title: "Reproducible Containers with Docker"
description: "Build a small Docker image with a non-root user and a controlled context; run it ephemerally only if Docker is already available."
module: "09-de-tu-equipo-a-la-nube"
order: 4
duration: 35
level: "Intermediate"
objectives:
  - "Distinguish a Docker image from a running container."
  - "Read a small Dockerfile that limits copied files and runs Python without root privileges."
  - "Build and test an ephemeral container locally when Docker is already available."
prerequisites:
  - "Be able to run commands in a terminal."
  - "Know the basic purpose of an application and its files."
updatedDate: '2026-10-08'
sources:
  - label: "Docker Docs: how to write a Dockerfile"
    url: "https://docs.docker.com/get-started/docker-concepts/building-images/writing-a-dockerfile/"
  - label: "Docker Docs: Dockerfile reference and COPY --chown"
    url: "https://docs.docker.com/reference/dockerfile/"
  - label: "Docker Docs: build context and .dockerignore"
    url: "https://docs.docker.com/build/concepts/context/"
  - label: "Docker Docs: build checks"
    url: "https://docs.docker.com/reference/build-checks/"
---

## Image, container, and recipe

An image is a read-only package containing the base system, files, and configuration a program needs. A container is an instance that uses that image with process, network, and filesystem isolation. It is not a complete virtual machine: it shares the host machine's kernel. A well-controlled image brings environments closer together, though it does not eliminate differences in architecture or external configuration.

A `Dockerfile` describes the build recipe. `FROM` selects a base image; `WORKDIR` sets the working directory; `COPY` adds files; `USER` changes the process identity; and `CMD` defines what runs by default. Keeping instructions few and copying only what is needed reduces size and attack surface. A tag such as `python:3.13-slim` is convenient for learning, but may point to later updates; in production, updates are documented and, when strict reproducibility is needed, the image digest is controlled too.

The build context is the set of files the Docker client sends to the builder. Running `docker build .` from an entire repository may include much more than expected. Do not use `COPY . .` out of habit: you could include keys, `.env` files, local data, or dependencies. Practice in an empty folder, create a `.dockerignore` list, and explicitly copy a single file. Secrets must not be baked into the image through `ARG`, `ENV`, or `COPY`; this example needs none.

## Local activity

This activity is optional and only proceeds if Docker CLI and an engine are already available. Running `docker version` checks both client and server. If it does not work, do not install anything for the lesson: move on to the explanation of the Dockerfile. In an empty practice folder, use a text editor to create `app.py`, `Dockerfile`, and `.dockerignore`.

`app.py` contains only:

```python
print("Proceso local terminado")
```


Save these instructions without an extension in `Dockerfile`:

```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY --chown=10001:10001 app.py .
USER 10001:10001
CMD ["python", "app.py"]
```


`COPY --chown` assigns the file to the numeric user that will run the process. `USER` avoids running as root; since the program only prints text, it does not need to write to the directory. The JSON form of `CMD` passes the command and its arguments separately. The `.dockerignore` file limits the context:

```text
.git
.env
.env.*
**/.env*
.venv
__pycache__
```


From that folder, `docker build --check .` asks BuildKit to check Dockerfile conventions without producing the image; if your version does not recognize `--check`, skip this step. Then `docker build -t leccion-docker-local .` builds an image with a local tag. The first build may download the base image and use network access, time, and disk space; by itself, it does not create cloud machines or billable cloud resources. Finally, `docker run --rm leccion-docker-local` creates the container, runs the program, and removes that container when it finishes. The image remains stored locally.

## Verification and outcome

The expected output when running the container is `Proceso local terminado`. You can inspect the configured user with `docker inspect --format '{{.Config.User}}' leccion-docker-local`; it should show `10001:10001`. The check runs in your own Docker engine and the container is removed by `--rm`, although the image remains. To remove the image too, after the container has finished, run `docker image rm leccion-docker-local`. Do not publish the image or use real credentials for this lab.

## Common errors and solutions

`Cannot connect to the Docker daemon` means the client cannot reach an engine: check the status of an existing installation or skip the exercise; do not turn this into an installation task. If Docker says it cannot find `app.py`, you ran `docker build` from another folder or did not save the file; check the current directory and the `.` context. If `docker build --check` is unavailable, your local version may not include that feature; continue with the instructions if a regular build is available. A failure while fetching the base image is usually a network or registry issue: do not switch to an unknown image or copy secrets to fix it. If you see a permissions error, review `COPY` and `USER` before switching back to root.

## Summary

Docker packages a recipe into an image and runs containers from it. To practice more safely, use a small context, exclude sensitive files, copy only what is needed, choose a non-root user, and remove the container with `--rm`. The build may download the base image, but the described test stays local and does not provision cloud resources. If Docker is not already running, reading and reasoning about the Dockerfile is still a valid outcome: no exercise requires installing software or creating an account.
