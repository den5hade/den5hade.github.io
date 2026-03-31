# Doerone

Minimalist, typography-first DevOps knowledge base built with Astro (static-first).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Content

Write Markdown entries under:

- `src/content/blog/`
- `src/content/notes/`

Each file must include frontmatter:

- `title` (string)
- `date` (YYYY-MM-DD, parsed into a `Date`)
- `tags` (string array)
- `description` (optional)

## Deployment (GitHub Pages)

1. Push to `main`.
2. GitHub Actions will build and deploy `dist/` to the `gh-pages` branch.
3. In your GitHub repo settings, set **Pages** source to the `gh-pages` branch.

