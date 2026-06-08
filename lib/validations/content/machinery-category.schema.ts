import { z } from "zod";

import { heroSchema } from "./sections/hero.schema";

export const machineryCategorySchema = z.object({
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),

  hero: heroSchema.optional(),

  title: z.string().min(1),
  description: z.string().optional(),

  listing: z
    .object({
      title: z.string().min(1).optional(),
      description: z.string().optional(),
      emptyMessage: z.string().optional(),
    })
    .optional(),
});

export type MachineryCategoryContent = z.infer<
  typeof machineryCategorySchema
>;