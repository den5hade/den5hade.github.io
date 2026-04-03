---
title: "SSH Tunnels: The 80/20"
date: 2026-03-20
tags: ["ssh", "networking"]
description: "Local forwards, remote forwards, and a couple gotchas."
---

## Local port forward (most common)

Use this when you want `localhost:<local_port>` to reach `remote:<remote_port>` through a jump host.

```bash
ssh -L 5432:127.0.0.1:5432 user@jump-host
```

Then point your client to:

```text
localhost:5432
```

## Remote port forward (server-side)

```bash
ssh -R 8080:127.0.0.1:80 user@jump-host
```

Now the jump host listens on `8080` and forwards to `80` on your machine.

## Backgrounding + keep-alive

```bash
ssh -f -N \
  -o ServerAliveInterval=30 \
  -o ServerAliveCountMax=2 \
  -L 5432:127.0.0.1:5432 user@jump-host
```

## Gotchas

- `127.0.0.1` vs `0.0.0.0`: pick what you actually mean.
- Firewalls sometimes need explicit inbound rules on the jump host side.

