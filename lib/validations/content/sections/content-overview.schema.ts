import { z } from "zod";

export const contentOverviewSlideSchema = z.object({
  src: z.string().min(1),
  alt: z.string().optional(),
});

export const contentOverviewSectionSchema = z.object({
  title: z.string().min(1).optional(),
  titleEn: z.string().optional(),
  code: z.string().optional(),
  capacity: z.string().optional(),
  paragraphs: z.array(z.string().min(1)).default([]),
  slides: z.array(contentOverviewSlideSchema).default([]),
  catalogHref: z.string().optional(),
  proformaHref: z.string().optional(),
  usedMachineHref: z.string().optional(),
  usedMachineLabel: z.string().optional(),
});

export type ContentOverviewSectionContent = z.infer<
  typeof contentOverviewSectionSchema
>;