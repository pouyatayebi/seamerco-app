import { z } from "zod";

import { heroSchema } from "./sections/hero.schema";

export const factorySetupIndexSchema = z.object({
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),

  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  hero: heroSchema.optional(),

  intro: z
    .object({
      eyebrow: z.string().optional(),
      title: z.string().min(1),
      description: z.string().min(1),
      highlights: z.array(z.string().min(1)).default([]),
    })
    .optional(),

  roadmap: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    detailButtonLabel: z.string().default("مشاهده مرحله"),
    steps: z
      .array(
        z.object({
          slug: z.string().min(1),
          order: z.number(),
        })
      )
      .default([]),
  }),
});

export type FactorySetupIndexContent = z.infer<
  typeof factorySetupIndexSchema
>;