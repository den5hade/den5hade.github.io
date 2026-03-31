import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const baseSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  description: z.string().optional(),
});

const contentDir = new URL("./content/", import.meta.url);

const blog = defineCollection({
  schema: baseSchema,
  loader: glob({
    base: new URL("./blog/", contentDir),
    pattern: "**/*.md",
  }),
});

const notes = defineCollection({
  schema: baseSchema.optional(),
  loader: glob({
    base: new URL("./notes/", contentDir),
    pattern: "**/*.md",
  }),
});

export const collections = {
  blog,
  notes,
};

