import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const workStyles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/workStyles' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).default([]),
    hours: z.string().optional(),
    days: z.string().optional(),
    place: z.enum(['在宅', '通勤', 'どちらも']).optional(),
    summary: z.string(),
    searchUrl: z.string().url().optional(),
  }),
});

const accommodations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/accommodations' }),
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
  }),
});

const voices = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/voices' }),
  schema: z.object({
    quote: z.string(),
    who: z.string(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
  }),
});

const columns = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/columns' }),
  schema: z.object({
    title: z.string(),
    kind: z.string().optional(),
  }),
});

export const collections = { workStyles, accommodations, voices, guides, columns };
