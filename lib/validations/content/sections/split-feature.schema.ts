import { z } from "zod";

export const splitFeatureSectionSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  paragraphs: z.array(z.string()).default([]),

  image: z
    .object({
      src: z.string().min(1),
      alt: z.string().optional(),
    })
    .optional(),

  button: z
    .object({
      label: z.string().min(1),
      href: z.string().min(1),
    })
    .optional(),
});

export type SplitFeatureSectionContent = z.infer<
  typeof splitFeatureSectionSchema
>;