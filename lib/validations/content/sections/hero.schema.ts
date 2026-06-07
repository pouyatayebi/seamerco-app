import { z } from "zod";

export const heroFeatureLinkSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  href: z.string().min(1),
  image: z
    .object({
      src: z.string().min(1),
      alt: z.string().optional(),
    })
    .optional(),
});

export const heroSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  poster: z.string().optional(),
  video: z.string().optional(),

  logotype: z.boolean().optional(),
  badge: z.boolean().optional(),

  featureLinks: z
    .object({
      variant: z.enum(["home", "compact"]).default("home"),
      titleTop: z.string().optional(),
      titleBottom: z.string().optional(),
      items: z.array(heroFeatureLinkSchema).default([]),
    })
    .optional(),
});

export type HeroContent = z.infer<typeof heroSchema>;