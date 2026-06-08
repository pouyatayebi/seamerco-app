import { z } from "zod";

import { heroSchema } from "./sections/hero.schema";

export const solutionsIndexSchema = z.object({
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),

  title: z.string().min(1),
  description: z.string().optional(),
  hero: heroSchema.optional(),

  listing: z
    .object({
      title: z.string().min(1).optional(),
      description: z.string().optional(),
      detailButtonLabel: z.string().default("مشاهده خط تولید"),
      emptyMessage: z.string().optional(),
    })
    .optional(),
});

export type SolutionsIndexContent = z.infer<typeof solutionsIndexSchema>;