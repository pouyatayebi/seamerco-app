import { z } from "zod";

export const projectsShowcaseSectionSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  sideDescription: z.string().optional(),

  detailsLabel: z.string().min(1).default("مشاهده جزئیات"),
  allProjectsLabel: z.string().min(1).optional(),
  allProjectsHref: z.string().min(1).optional(),

  items: z.array(z.string().min(1)).default([]),
});

export type ProjectsShowcaseSectionContent = z.infer<
  typeof projectsShowcaseSectionSchema
>;