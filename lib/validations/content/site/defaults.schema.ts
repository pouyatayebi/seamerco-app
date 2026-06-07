import { z } from "zod";

export const siteDefaultsSchema = z.object({
  hero: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1).optional(),
    poster: z.string().min(1).optional(),
    video: z.string().min(1).optional(),

    logotype: z
      .object({
        enabled: z.boolean().default(false),
        src: z.string().min(1).optional(),
        alt: z.string().optional(),
      })
      .default({ enabled: false }),

    badge: z
      .object({
        enabled: z.boolean().default(false),
        src: z.string().min(1).optional(),
        alt: z.string().optional(),
      })
      .default({ enabled: false }),
  }),
});

export type SiteDefaults = z.infer<typeof siteDefaultsSchema>;