import { z } from "zod";

import { heroSchema } from "./sections/hero.schema";

export const usedEquipmentItemSchema = z.object({
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),

  title: z.string().min(1),
  subtitle: z.string().optional(),
  excerpt: z.string().optional(),

  type: z.enum(["machine", "production-line"]),
  category: z.string().min(1),
  relatedSolutions: z.array(z.string().min(1)).default([]),

  status: z.enum(["available", "reserved", "refurbishing", "sold"]).default("available"),
  condition: z.string().optional(),
  capacity: z.string().optional(),
  code: z.string().optional(),

  featuredImage: z.string().default("card.webp"),
  video: z.string().optional(),

  hero: heroSchema.optional(),

  specs: z.array(
    z.object({
      label: z.string().min(1),
      value: z.string().min(1),
    })
  ).default([]),

  gallery: z.array(
    z.object({
      image: z.string().min(1),
      alt: z.string().optional(),
    })
  ).default([]),
});

export type UsedEquipmentItemContent = z.infer<typeof usedEquipmentItemSchema>;