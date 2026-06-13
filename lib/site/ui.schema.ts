import { z } from "zod";

export const siteUiSchema = z.object({
  labels: z.object({
    productionLinesEyebrow: z.string(),

    capacity: z.string(),
    code: z.string(),

    viewDetails: z.string(),

    technicalSpecs: z.string(),
    features: z.string(),

    lineLayout: z.string(),
    lineLayoutSubtitle: z.string(),

    contactUs: z.string(),
    requestQuote: z.string(),

    usedMachines: z.string(),
  }),
});

export type SiteUiContent = z.infer<typeof siteUiSchema>;