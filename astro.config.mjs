import { defineConfig } from "astro/config";
import remarkSlug from "remark-slug";
import rehypeAutolinkHeadings from "remark-autolink-headings";

// Config is intentionally minimal and parameterized for GitHub Pages base path.
// Set `ASTRO_BASE` during build/deploy to make root-relative URLs work.
const base = process.env.ASTRO_BASE ?? "/";

export default defineConfig({
  site: process.env.ASTRO_SITE || undefined,
  base,
  build: {
    // Keep output as files for easy static hosting.
    format: "file",
  },
  markdown: {
    remarkPlugins: [remarkSlug],
    rehypePlugins: [
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

