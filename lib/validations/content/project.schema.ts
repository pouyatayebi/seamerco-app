import { z } from "zod";

export const projectPageSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).optional(),

  tag: z.string().optional(),
  location: z.string().optional(),
  country: z.string().optional(),
  year: z.string().optional(),
  duration: z.string().optional(),
  capacity: z.string().optional(),
  lineType: z.string().optional(),

  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),

  hero: z
    .object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      poster: z.string().optional(),
      logotype: z.boolean().optional(),
      badge: z.boolean().optional(),
    })
    .optional(),
});

export type ProjectPageContent = z.infer<typeof projectPageSchema>;