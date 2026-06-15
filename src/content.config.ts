import { defineCollection } from 'astro:content'
import { z } from 'zod'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
  }),
})

const novel = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/novel' }),
  schema: z.object({
    title: z.string(),
    ogImage: z.string().optional(),
    image: z.string().optional(),
  }),
})

const memo = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/memo' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
  }),
})

export const collections = { blog, novel, memo }
