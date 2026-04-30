# git-blog

Minimalist, typography-first knowledge base built with Astro (static-first).

## About

**git-blog** is a lightweight blogging platform designed for professionals and developers. It's specifically built for simplicity: **write formatted Markdown documents, and the framework handles everything else.**

### How It Works

1. **Write Content**: Simply add Markdown files (`.md`) to `src/content/blog/` or `src/content/news/`
2. **Add Metadata**: Include frontmatter with title, date, tags, and optional description
3. **Framework Magic**: Astro automatically:
   - Converts your Markdown to HTML
   - Generates static pages for each article
   - Creates tag-based collections and archives
   - Builds a fast, SEO-friendly static site
4. **Deploy**: Push to GitHub, and GitHub Actions automatically builds and deploys

### Why Astro?

- **Zero JavaScript by default** – Fast, lightweight static HTML
- **Markdown-first** – Write content, not configuration
- **Minimal setup** – No complex theme engines or templating
- **Static generation** – Built-in optimization for performance
- **Content Collections** – Organize blog posts and news seamlessly

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Content Structure

Write Markdown entries under:

- `src/content/blog/` – Longer write-ups and deep dives
- `src/content/news/` – Quick patterns, configs, and tips

### Frontmatter Requirements

Every Markdown file must include:

```yaml
---
title: Your Post Title
date: YYYY-MM-DD
tags: [tag1, tag2]
description: Optional brief description
---
```

- `title` (string) – Article headline
- `date` (YYYY-MM-DD) – Publication date
- `tags` (array) – Topic tags for categorization
- `description` (optional) – Brief summary for metadata

### Content Example

```markdown
---
title: Docker Quick Reference
date: 2024-01-15
tags: [docker, devops]
description: Essential Docker commands for daily use
---

# Docker Quick Reference

Your markdown content here...
```

## Image Support

### Adding Images to Blog/News Posts

**Folder Structure:**

Store images in the `public/images/` directory:

```
public/
  ├── doer_logo.png
  ├── favicon.png
  └── images/
      ├── blog/
      │   ├── docker-guide.png
      │   └── deployment.png
      └── news/
          ├── quick-tip.png
          └── config-example.png
```

### How to Use Images

1. **Save your image** to `public/images/blog/` or `public/images/news/`

2. **Reference it in your Markdown**:

```markdown
---
title: Docker Guide
date: 2024-01-15
tags: [docker]
---

# Docker Architecture

![Docker architecture diagram](/images/blog/docker-guide.png)

Some text here...

![Quick reference](/images/blog/deployment.png)
```

### Example Folder Organization

```
src/content/blog/
  └── docker-deployment-guide.md

public/images/blog/
  ├── docker-architecture.png
  ├── deployment-flow.png
  └── commands-reference.png
```

In `docker-deployment-guide.md`, reference images like:

```markdown
![Architecture](/images/blog/docker-architecture.png)
```

### Image Best Practices

- **Keep filenames descriptive** – `docker-architecture.png` instead of `image1.png`
- **Use PNG or WebP** – Perfect for diagrams and screenshots
- **Organize by content type** – Use `blog/` or `news/` subfolders
- **Optimize before upload** – Compress images to reduce deployment size
- **Add alt text** – Always include descriptions in `![alt text](...)`

---## Deployment & GitHub Actions

### How It Works

1. **Push to `main` branch** – Trigger the workflow
2. **GitHub Actions automatically**:
   - Installs dependencies (`npm install`)
   - Builds the static site (`npm run build`)
   - Generates optimized HTML in `dist/`
3. **Deploy to GitHub Pages**:
   - Workflow pushes built files to `gh-pages` branch
   - GitHub automatically serves from `gh-pages`

### Setup GitHub Pages

1. In your GitHub repo settings:
   - Go to **Settings** → **Pages**
   - Set **Source** to `gh-pages` branch
   - Save

2. Your site will be live at:
   - `https://yourusername.github.io/git-blog` (if a user/org repo named `git-blog`)
   - `https://yourusername.github.io/` (if repo is named `yourusername.github.io`)

### Workflow File

The GitHub Actions workflow (`.github/workflows/deploy.yml`) handles:
- Building the Astro site
- Uploading artifacts
- Deploying to `gh-pages` branch

Each push to `main` triggers an automatic build and deployment.

