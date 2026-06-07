import { z } from "zod";

export const cardGridReferenceSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("solution"),
    slug: z.string().min(1),
  }),

  z.object({
    type: z.literal("machinery"),
    categorySlug: z.string().min(1),
    slug: z.string().min(1),
  }),

  z.object({
    type: z.literal("project"),
    slug: z.string().min(1),
  }),
]);

export const cardGridSectionSchema = z.object({
  title: z.string().min(1).optional(),
  detailButtonLabel: z.string().min(1).default("جزئیات بیشتر"),
  items: z.array(cardGridReferenceSchema).default([]),
});

export type CardGridSectionContent = z.infer<typeof cardGridSectionSchema>;
export type CardGridReference = z.infer<typeof cardGridReferenceSchema>;