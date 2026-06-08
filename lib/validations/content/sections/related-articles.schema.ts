import { z } from "zod";

export const relatedArticlesSectionSchema = z.object({
  title: z.string().min(1),
  detailButtonLabel: z.string().min(1).default("مطالعه بیشتر"),
  items: z.array(z.string().min(1)).default([]),
});

export type RelatedArticlesSectionContent = z.infer<
  typeof relatedArticlesSectionSchema
>;