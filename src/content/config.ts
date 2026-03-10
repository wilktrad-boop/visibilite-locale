import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    lang: z.enum(['fr', 'en', 'es']),
    slug: z.string().optional(),
  }),
});

export const collections = { blog };
