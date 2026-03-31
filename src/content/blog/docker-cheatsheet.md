---
title: "Docker Cheatsheet for Dev + Deploy"
date: 2026-03-28
tags: ["docker", "devops", "deployment"]
description: "Command patterns you use over and over (build, run, volumes, logs)."
---

## Build images

```bash
docker build -t myapp:local .
```

## Run containers

```bash
docker run --rm -p 8000:8000 myapp:local
```

## Volumes (hot reload style)

```bash
docker run --rm \
  -p 8000:8000 \
  -v "$(pwd)/app:/app" \
  myapp:local
```

## Logs

```bash
docker logs -f <container_id>
```

## Environment variables

```bash
docker run --rm \
  -p 8000:8000 \
  -e "ENV=production" \
  myapp:local
```

## Multi-stage builds (sketch)

```dockerfile
FROM python:3.12-slim AS base
WORKDIR /app

FROM base AS deps
COPY requirements.txt .
RUN pip install -r requirements.txt

FROM base AS runtime
COPY --from=deps /usr/local /usr/local
COPY . .
CMD ["python", "main.py"]
```

