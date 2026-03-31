---
title: "Deploy FastAPI on AWS EC2"
date: 2026-03-30
tags: ["aws", "fastapi", "deployment"]
description: "A practical, SSH-first walkthrough to run FastAPI on EC2."
---

## Step 1 — Setup server

```bash
sudo apt update
sudo apt install -y nginx python3 python3-venv build-essential
```

> Open port `8000` (or whatever port your app binds to), and port `80/443` for Nginx.

## Step 2 — Create a Python app environment

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -U pip
pip install fastapi uvicorn[standard]
```

## Step 3 — Run with Uvicorn

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Step 4 — Put Nginx in front

Example `server` block (basic reverse proxy):

```nginx
server {
  listen 80;
  server_name _;

  location / {
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## Step 5 — Add systemd (keep it alive)

```ini
# /etc/systemd/system/fastapi.service
[Unit]
Description=FastAPI
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/your-app
ExecStart=/home/ubuntu/your-app/.venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable fastapi
sudo systemctl start fastapi
```

