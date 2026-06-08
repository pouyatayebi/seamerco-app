import { z } from "zod";

import { heroSchema } from "./sections/hero.schema";

export const machineryIndexSchema = z.object({
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),

  hero: heroSchema.optional(),

  title: z.string().min(1),
  description: z.string().optional(),

  filters: z
    .object({
      allLabel: z.string().default("همه ماشین‌آلات"),
      categoryLabel: z.string().default("نوع ماشین‌آلات"),
      solutionLabel: z.string().default("خط تولید"),
      allSolutionsLabel: z.string().default("همه خطوط تولید"),
      solutions: z
        .array(
          z.object({
            slug: z.string().min(1),
            title: z.string().min(1),
          })
        )
        .default([]),
    })
    .optional(),
});

export type MachineryIndexContent = z.infer<typeof machineryIndexSchema>;