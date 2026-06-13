import { z } from "zod";

import { heroSchema } from "./sections/hero.schema";
import { cardGridSectionSchema } from "./sections/card-grid.schema";
import { contentOverviewSectionSchema } from "./sections/content-overview.schema";
import { lineLayoutSectionSchema } from "./sections/line-layout.schema";
import { faqSectionSchema } from "./sections/faq.schema";
import { relatedArticlesSectionSchema } from "./sections/related-articles.schema";
import { mediaGallerySectionSchema } from "@/lib/validations/content/sections/media-gallery.schema";
import { technicalSpecsSectionSchema } from "@/lib/validations/content/sections/technical-specs.schema";
const pageSeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const pageContentSchema = z.object({
  seo: pageSeoSchema.optional(),
  hero: heroSchema.optional(),
  overview: contentOverviewSectionSchema.optional(),
  lineLayout: lineLayoutSectionSchema.optional(),
  cardGrid: cardGridSectionSchema.optional(),

  title: z.string().optional(),
  subtitle: z.string().optional(),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  cover: z.string().optional(),
  capacity: z.string().optional(),
  code: z.string().optional(),
  faq: faqSectionSchema.optional(),
  relatedArticles: relatedArticlesSectionSchema.optional(),
  technicalSpecs: technicalSpecsSectionSchema.optional(),
  gallery: mediaGallerySectionSchema.optional(),
});

export type PageContent = z.infer<typeof pageContentSchema>;