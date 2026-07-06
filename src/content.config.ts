import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const placeholderPattern = /这里写一段|TODO|TBD|占位/;
const descriptionSchema = z
  .string()
  .min(20, "description must be specific enough for SEO")
  .max(220, "description should stay concise")
  .refine((value) => !placeholderPattern.test(value), "description must not contain placeholder copy");

const faqItemSchema = z.object({
  q: z.string().min(4),
  a: z.string().min(4).max(120),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().min(6).max(60),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    published: z.date(),
    updated: z.date().optional(),
    dateModified: z.date(),
    draft: z.boolean().optional().default(false),
    description: descriptionSchema,
    image: z.string().optional().default(""),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional().nullable().default("AI教程"),
    lang: z.string().optional().default("zh-CN"),
    relatedTools: z.array(z.string()).default([]),
    faq: z.array(faqItemSchema).default([]),
  }),
});

export const collections = {
  posts,
};
