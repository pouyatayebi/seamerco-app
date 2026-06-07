import { z } from "zod";
import { heroSchema } from "./sections/hero.schema";

export const blogFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  hero: heroSchema.optional(),
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;