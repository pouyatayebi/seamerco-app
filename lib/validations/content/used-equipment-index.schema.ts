import { z } from "zod";

import { heroSchema } from "./sections/hero.schema";

export const usedEquipmentIndexSchema = z.object({
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),

  title: z.string().min(1),
  description: z.string().optional(),
  hero: heroSchema.optional(),

  filters: z.object({
    allLabel: z.string().default("همه موارد"),
    machineLabel: z.string().default("ماشین‌آلات"),
    lineLabel: z.string().default("خطوط تولید"),
    statusLabel: z.string().default("وضعیت"),
  }).optional(),

  intro: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    highlights: z.array(z.string().min(1)).default([]),
  }),

  process: z.object({
    title: z.string().min(1),
    items: z.array(z.string().min(1)).default([]),
  }),
});

export type UsedEquipmentIndexContent = z.infer<typeof usedEquipmentIndexSchema>;