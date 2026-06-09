import { z } from "zod";

import { heroSchema } from "./sections/hero.schema";
import { faqSectionSchema } from "./sections/faq.schema";
import { relatedArticlesSectionSchema } from "./sections/related-articles.schema";

export const factorySetupStepSchema = z.object({
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),

  title: z.string().min(1),
  subtitle: z.string().optional(),
  excerpt: z.string().optional(),

  featuredImage: z.string().optional(),
  cover: z.string().optional(),
  video: z.string().optional(),

  duration: z.string().optional(),
  output: z.string().optional(),

  hero: heroSchema.optional(),

  summary: z
    .object({
      eyebrow: z.string().optional(),
      title: z.string().min(1),
      description: z.string().min(1),
      paragraphs: z.array(z.string().min(1)).default([]),
      highlights: z.array(z.string().min(1)).default([]),
    })
    .optional(),

  process: z
    .object({
      title: z.string().min(1),
      description: z.string().optional(),
      items: z
        .array(
          z.object({
            title: z.string().min(1),
            description: z.string().min(1),
          })
        )
        .default([]),
    })
    .optional(),

  deliverables: z
    .object({
      title: z.string().min(1),
      items: z.array(z.string().min(1)).default([]),
    })
    .optional(),

  gallery: z
    .object({
      title: z.string().min(1),
      description: z.string().optional(),
      items: z
        .array(
          z.object({
            image: z.string().min(1),
            alt: z.string().optional(),
          })
        )
        .default([]),
    })
    .optional(),

  faq: faqSectionSchema.optional(),
  relatedArticles: relatedArticlesSectionSchema.optional(),
});

export type FactorySetupStepContent = z.infer<
  typeof factorySetupStepSchema
>;