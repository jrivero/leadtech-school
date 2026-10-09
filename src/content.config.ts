import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sharedFields = {
  title: z.string().min(8),
  description: z.string().min(40).max(260),
  module: z.string().regex(/^\d{2}-[a-z0-9-]+$/),
  order: z.number().int().positive(),
  duration: z.number().int().min(5).max(360),
  objectives: z.array(z.string().min(8)).min(3),
  prerequisites: z.array(z.string()),
  updatedDate: z.coerce.date(),
  sources: z.array(z.object({ label: z.string().min(3), url: z.url().refine((value) => new URL(value).protocol === 'https:', 'Sources must use HTTPS') })).min(1),
};
const lecciones = defineCollection({
  loader: glob({ base: './src/content/lecciones', pattern: '**/*.md' }),
  schema: z.object({ ...sharedFields, level: z.enum(['Inicial', 'Intermedio']) }),
});
const englishLessons = defineCollection({
  loader: glob({ base: './src/content/en', pattern: '**/*.md' }),
  schema: z.object({ ...sharedFields, level: z.enum(['Beginner', 'Intermediate']) }),
});
export const collections = { lecciones, englishLessons };
