# Project workflow

This document describes:

- How to set up the GitHub repository for this Astro site.
- How to add and publish new posts.

---

## 1. Set up Git & GitHub

From your project directory:

```bash
cd /Users/dshaderkin/doerone
git init
git add .
git commit -m "Initial commit"
```

Create a new **empty** repository on GitHub (no README/license/template), then connect and push:

```bash
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 1.1 Enable GitHub Actions write access

In the GitHub repo:

1. Go to **Settings → Actions → General**.
2. Under **Workflow permissions**, select **Read and write permissions**.
3. Save.

### 1.2 Configure GitHub Pages

After you push to `main` once, the `Deploy to GitHub Pages` workflow will run and create a `gh-pages` branch.

Then:

1. Go to **Settings → Pages**.
2. Set **Source** to **Deploy from a branch**.
3. Select branch `gh-pages` and folder `/ (root)`.
4. Save.

The site will be available at:

- `https://<user>.github.io/` if your repo is named `<user>.github.io`.
- `https://<user>.github.io/<repo-name>/` for any other repo name.

The workflow automatically sets `ASTRO_BASE` and `ASTRO_SITE` so links work in both cases.

---

## 2. Local development & build

From the project root:

```bash
npm install      # first time only
npm run dev      # local dev server
```

To check that the static build works:

```bash
npm run build
```

> `dist/` is generated but ignored by git (see `.gitignore`), so you do **not** commit it.

---

## 3. Adding a new post

There are two kinds of content:

- **Blog posts**: `src/content/blog/`
- **Notes**: `src/content/notes/`

Each file is standard Markdown with frontmatter.

### 3.1 Create the file

Pick one of the following patterns.

**New blog post**

```bash
cd /Users/dshaderkin/doerone
cp src/content/blog/docker-cheatsheet.md src/content/blog/my-new-post.md
```

**New note**

```bash
cd /Users/dshaderkin/doerone
cp src/content/notes/nginx-config.md src/content/notes/my-new-note.md
```

Then open the new file and edit it.

### 3.2 Update the frontmatter

At the top of the file, make sure you have:

```md
---
title: "My New Post"
date: 2026-03-31        # YYYY-MM-DD
tags: ["devops", "aws"] # any tags you like
description: "Short summary shown in lists"
---
```

Below the frontmatter, write the Markdown content:

```md
## Section title

Some text here.

```bash
echo "code blocks get copy buttons"
```
```

### 3.3 Verify locally

Run:

```bash
npm run dev
```

Check in the browser:

- `/` home page:
  - New post appears in “Latest blog” or “Latest notes”.
- `/blog/` or `/notes/`:
  - New entry shows in the list.
- `/blog/<slug>.html` or `/notes/<slug>.html`:
  - Detail page renders correctly with code highlighting and copy buttons.

Optionally run a full static build:

```bash
npm run build
```

### 3.4 Commit and push

When you’re happy with the new post:

```bash
git status                    # confirm only source files changed
git add src/content/blog/my-new-post.md
git commit -m "Add: my new post"
git push
```

GitHub Actions will:

1. Install dependencies.
2. Run `npm run build`.
3. Publish `dist/` to the `gh-pages` branch.

A few minutes after the push, the new post will be live on your GitHub Pages URL.

---

## 4. Quick checklist for each new post

1. **Create file** under `src/content/blog/` or `src/content/notes/`.
2. **Fill frontmatter**: `title`, `date`, `tags`, `description` (optional).
3. **Write content** in Markdown.
4. **Run locally**: `npm run dev` (and optionally `npm run build`).
5. **Commit & push** the `.md` file to `main`.
6. **Wait for GitHub Actions** to finish; check the live site.

