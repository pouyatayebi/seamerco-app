import { z } from "zod";

export const siteSettingsSchema = z.object({
  site: z.object({
    name: z.string(),
    url: z.string(),
  }),

  seo: z.object({
    defaultTitle: z.string(),
    description: z.string(),
  }),

  brand: z.object({
    top: z.string(),
    bottom: z.string(),
  }),

  contact: z.object({
    email: z.object({
      label: z.string(),
      href: z.string(),
    }),

    officePhone: z.object({
      label: z.string(),
      href: z.string(),
    }),

    mobile: z.object({
      label: z.string(),
      href: z.string(),
    }),

    whatsapp: z.object({
      label: z.string(),
      href: z.string(),
    }),

    consultation: z.object({
      label: z.string(),
      mobileLabel: z.string(),
      href: z.string(),
      mobileHref: z.string(),
    }),

    officeAddress: z.object({
      label: z.string(),
      mapUrl: z.string(),
    }),

    workshopAddress: z.object({
      label: z.string(),
      mapUrl: z.string(),
    }),
  }),

  socialLinks: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
    })
  ),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;