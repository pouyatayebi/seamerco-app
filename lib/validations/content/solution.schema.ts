import { z } from "zod";

import {
  mediaFileSchema,
  seoSchema,
  specificationItemSchema,
} from "./shared.schema";

export const solutionPageSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),

  hero: z.object({
    image: mediaFileSchema,
    video: mediaFileSchema.optional(),
  }),

  seo: seoSchema,

  specifications: z.array(specificationItemSchema).default([]),

  gallery: z.array(mediaFileSchema).default([]),
});

export type SolutionPageContent = z.infer<typeof solutionPageSchema>;