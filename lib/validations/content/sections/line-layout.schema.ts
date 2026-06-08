import { z } from "zod";

export const lineLayoutItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),

  hotspot: z.object({
    x: z.number(),
    y: z.number(),
  }),

  image: z.string().optional(),
  summary: z.string().optional(),
  points: z.array(z.string().min(1)).default([]),
});

export const lineLayoutSectionSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),

  image: z.object({
    src: z.string().min(1),
    alt: z.string().optional(),
  }),

  items: z.array(lineLayoutItemSchema).default([]),
});

export type LineLayoutSectionContent = z.infer<typeof lineLayoutSectionSchema>;