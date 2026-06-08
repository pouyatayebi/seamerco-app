import { z } from "zod";

import { heroSchema } from "./sections/hero.schema";

export const projectsIndexSchema = z.object({
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
      detailButtonLabel: z.string().default("مشاهده پروژه"),
      emptyMessage: z.string().optional(),
    })
    .optional(),
});

export type ProjectsIndexContent = z.infer<typeof projectsIndexSchema>;