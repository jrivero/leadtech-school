import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const lecciones = defineCollection({
  loader: glob({ base: './src/content/lecciones', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(8),
    description: z.string().min(40).max(260),
    module: z.string().regex(/^\d{2}-[a-z0-9-]+$/),
    order: z.number().int().positive(),
    duration: z.number().int().min(5).max(360),
    level: z.enum(['Inicial', 'Intermedio']),
    objectives: z.array(z.string().min(8)).min(3),
    prerequisites: z.array(z.string()),
    updatedDate: z.coerce.date(),
    sources: z.array(z.object({ label: z.string().min(3), url: z.url().refine((value) => new URL(value).protocol === 'https:', 'Las fuentes deben usar HTTPS') })).min(1),
  }),
});
export const collections = { lecciones };
