import { z } from "zod";

const cardGridBaseReferenceSchema = {
  description: z.string().optional(),
  icon: z.string().optional(),
};

export const cardGridReferenceSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("solution"),
    slug: z.string().min(1),
    ...cardGridBaseReferenceSchema,
  }),

  z.object({
    type: z.literal("machinery"),
    categorySlug: z.string().min(1),
    slug: z.string().min(1),
    ...cardGridBaseReferenceSchema,
  }),

  z.object({
    type: z.literal("project"),
    slug: z.string().min(1),
    ...cardGridBaseReferenceSchema,
  }),
]);

export const cardGridSectionSchema = z.object({
  title: z.string().min(1).optional(),
  background: z.string().min(1).optional(),
  detailButtonLabel: z.string().min(1).default("جزئیات بیشتر"),
  items: z.array(cardGridReferenceSchema).default([]),
});

export type CardGridSectionContent = z.infer<typeof cardGridSectionSchema>;
export type CardGridReference = z.infer<typeof cardGridReferenceSchema>;