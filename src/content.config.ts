import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * La historia vive aquí, en Markdown, editable sin tocar componentes.
 * Base actual: «Propuesta web narrativa» v0.1.0 (marzo 2025).
 * Cuando llegue el .md definitivo, se sustituyen estos ficheros 1:1.
 */
const story = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/story' }),
  schema: z.object({
    lang: z.enum(['es', 'en']),
    act: z.number().int().min(1).max(3),
    phase: z.number().int().min(0).max(6),
    order: z.number(),
    kind: z.enum(['fase', 'camino', 'portal']).default('fase'),
    title: z.string(),
    subtitle: z.string().optional(),
    /** Solo para kind=portal: destino de la capa operativa. */
    portalKey: z.enum(['experiencias', 'compania', 'contacto']).optional(),
    portalHash: z.string().optional(),
    /** Solo para caminos con decisión (gamificación Nivel B). */
    choice: z
      .object({
        question: z.string(),
        options: z
          .array(z.object({ label: z.string(), outcome: z.string() }))
          .min(2)
          .max(2),
      })
      .optional(),
  }),
});

export const collections = { story };
