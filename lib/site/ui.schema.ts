import { z } from "zod";

export const siteUiSchema = z.object({
  labels: z.object({
    productionLinesEyebrow: z.string().default("PRODUCTION LINES"),
    capacity: z.string().default("ظرفیت"),
    viewDetails: z.string().default("مشاهده جزئیات"),
  }),
});

export type SiteUiContent = z.infer<typeof siteUiSchema>;