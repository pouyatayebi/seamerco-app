import { z } from "zod";

import { heroSchema } from "./sections/hero.schema";
import { cardGridSectionSchema } from "./sections/card-grid.schema";

const pageSeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const pageContentSchema = z.object({
  seo: pageSeoSchema.optional(),
  hero: heroSchema.optional(),
  cardGrid: cardGridSectionSchema.optional(),
});

export type PageContent = z.infer<typeof pageContentSchema>;