import { readFileSync } from 'node:fs';
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { extraerTokensDeColor } from './scripts/escenas-validate';

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

/* ============================================================
   Motor de escena (ADR 0008): el guion como fuente de verdad.
   Tres colecciones que interpretan el guion narrativo. El guion
   aún NO existe (docs/narrativa/ vacío): nacen vacías y todo
   compila igualmente. Los tipos planos espejo y las validaciones
   cruzadas viven en src/scripts/escenas-validate.ts.
   ============================================================ */

/**
 * Enum de tokens del canon generado leyendo src/styles/tokens.css en
 * build (Node, nunca en cliente). Así `colorHablante`, `bandas` y `luz`
 * solo admiten NOMBRES de token —jamás valores hex— y el esquema no se
 * desincroniza del canon Khepri si la paleta cambia.
 */
const tokensCss = readFileSync(new URL('./styles/tokens.css', import.meta.url), 'utf-8');
const nombresDeToken = extraerTokensDeColor(tokensCss);
const [primerToken, ...restoDeTokens] = nombresDeToken;
if (primerToken === undefined) {
  // Mejor romper el build con un mensaje claro que validar contra un
  // enum vacío en silencio.
  throw new Error('tokens.css no contiene tokens de color: revisa src/styles/tokens.css');
}
const tokenCanon = z.enum([primerToken, ...restoDeTokens]);

const lang = z.enum(['es', 'en']);

/**
 * Vocabulario CERRADO de acciones escénicas. `discriminatedUnion` elige la
 * rama por `verbo` y `.strict()` rechaza claves desconocidas: un verbo
 * nuevo exige cambiar este esquema (y su espejo en escenas-validate.ts),
 * no basta con escribirlo en el guion. Documentado en ADR 0008.
 */
const accion = z.discriminatedUnion('verbo', [
  z.object({ verbo: z.literal('entra') }).strict(),
  z.object({ verbo: z.literal('sale') }).strict(),
  z.object({ verbo: z.literal('pose'), pose: z.string() }).strict(),
  z.object({ verbo: z.literal('camina-hasta'), destino: z.string() }).strict(),
  // La luz se expresa como token del canon, igual que en `escenarios.luz`.
  z.object({ verbo: z.literal('luz'), token: tokenCanon }).strict(),
  z.object({ verbo: z.literal('pausa') }).strict(),
]);

/** Quién habla y actúa: el elenco, con su voz y sus límites por escrito. */
const personajes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/personajes' }),
  schema: z.object({
    id: z.string(),
    lang,
    nombre: z.string(),
    papel: z.enum(['avatar', 'voz', 'secundario']),
    /** Nombre de token del canon; el hex vive solo en tokens.css. */
    colorHablante: tokenCanon,
    /**
     * Ruta relativa a src/assets/pixel/ (sin barra inicial ni `..`),
     * siempre SVG: los sprites del kit son tematizables vía currentColor.
     */
    sprite: z.string().regex(/^[\w-]+(\/[\w-]+)*\.svg$/, {
      message: 'sprite debe ser una ruta relativa a src/assets/pixel/ acabada en .svg',
    }),
    poses: z.array(z.string()),
    reglasDeVoz: z.string(),
    limites: z.string(),
  }),
});

/** Dónde ocurre: cada escenario ocupa exactamente un tramo de la panorámica. */
const escenarios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/escenarios' }),
  schema: z.object({
    id: z.string(),
    lang,
    nombre: z.string(),
    /** Bandas de color del fondo, como tokens del canon. */
    bandas: z.array(tokenCanon).min(1),
    elementos: z.array(z.string()),
    /** Una luz por tramo, también como token del canon. */
    luz: tokenCanon,
    /** Índice (desde 0) del tramo que este escenario ocupa. */
    tramoPanoramica: z.number().int().min(0),
  }),
});

/** Qué pasa: la secuencia de beats que la web interpreta tal cual. */
const escenas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/escenas' }),
  schema: z.object({
    orden: z.number(),
    lang,
    acto: z.number().int().min(1).max(3),
    fase: z.number().int().min(0).max(6),
    /** Etapa comercial que cubre la escena; cobertura y cierre únicos se
     * comprueban en validateEscenas (no cabe en Zod por-entrada). */
    funnel: z.enum(['conciencia', 'interes', 'consideracion', 'intencion', 'accion']),
    /** Astro verifica en build que el escenario referenciado existe. */
    escenario: reference('escenarios'),
    beats: z
      .array(
        z.object({
          /** El literal va primero: si no, la referencia intentaría
           * resolver 'sistema' como id de personaje y fallaría. */
          hablante: z.union([z.literal('sistema'), reference('personajes')]),
          parlamento: z.string(),
          accion: accion.optional(),
        }),
      )
      .min(1),
  }),
});

export const collections = { story, personajes, escenarios, escenas };
