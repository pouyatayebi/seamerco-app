import { z } from "zod";

export const cardSourcePageSchema = z.object({
  title: z.string().min(1).optional(),
  subtitle: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  content: z.string().min(1).optional(),

  featuredImage: z.string().min(1).optional(),
  cover: z.string().min(1).optional(),

  capacity: z.string().min(1).optional(),
  code: z.string().min(1).optional(),

  relatedSolutions: z.array(z.string().min(1)).default([]),

  hero: z
    .object({
      title: z.string().min(1).optional(),
      subtitle: z.string().min(1).optional(),
      poster: z.string().min(1).optional(),
    })
    .optional(),

  overview: z
    .object({
      title: z.string().min(1).optional(),
      paragraphs: z.array(z.string().min(1)).default([]),
    })
    .optional(),
});

export type CardSourcePage = z.infer<typeof cardSourcePageSchema>;