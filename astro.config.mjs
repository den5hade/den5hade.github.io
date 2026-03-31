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
    // Keep output as files for easy static hosting.
    format: "file",
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

