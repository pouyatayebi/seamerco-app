import { z } from "zod";

export const technicalSpecsSectionSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  specificationTitle: z.string(),
  featuresTitle: z.string(),
  specifications: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      unit: z.string().optional(),
      description: z.string().optional(),
    }),
  ),
  features: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
    }),
  ),
});

export type TechnicalSpecsSectionContent = z.infer<
  typeof technicalSpecsSectionSchema
>;