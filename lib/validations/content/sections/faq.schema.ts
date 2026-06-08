import { z } from "zod";

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const faqSectionSchema = z.object({
  title: z.string().min(1),
  image: z.string().optional(),

  items: z.array(faqItemSchema).default([]),
});

export type FaqSectionContent = z.infer<
  typeof faqSectionSchema
>;