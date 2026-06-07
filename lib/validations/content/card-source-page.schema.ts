import { z } from "zod";

export const cardSourcePageSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),

  featuredImage: z.string().optional(),
  cover: z.string().optional(),

  capacity: z.string().optional(),
  code: z.string().optional(),

  hero: z
    .object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      poster: z.string().optional(),
    })
    .optional(),

  overview: z
    .object({
      paragraphs: z.array(z.string()).optional(),
    })
    .optional(),
});

export type CardSourcePage = z.infer<typeof cardSourcePageSchema>;