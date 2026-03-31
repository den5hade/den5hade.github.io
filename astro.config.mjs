import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// Config is intentionally minimal and parameterized for GitHub Pages base path.
// Set `ASTRO_BASE` during build/deploy to make root-relative URLs work.
const base = process.env.ASTRO_BASE ?? "/";

export default defineConfig({
  site: process.env.ASTRO_SITE || undefined,
  base,
  build: {
    // Use directory format so each page becomes slug/index.html.
    // This ensures both /blog/alembic and /blog/alembic/ resolve correctly on GitHub Pages.
    format: "directory",
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "after",
          linkProperties: {
            className: "heading-anchor",
            ariaHidden: true,
            tabIndex: -1,
          },
          content: { type: "text", value: "¶" },
        },
      ],
    ],
  },
});

