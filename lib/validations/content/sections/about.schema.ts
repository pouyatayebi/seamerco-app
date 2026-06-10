import { z } from "zod";

const aboutMediaItemSchema = z.object({
  image: z.string().min(1),
  video: z.string().min(1),
  alt: z.string().min(1),
});

export const aboutSectionSchema = z.object({
  title: z.string().min(1),
  eyebrow: z.string().optional(),
  introStrong: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),

  readMore: z.object({
    label: z.string().min(1),
    href: z.string().min(1),
  }),

  media: z.object({
    main: aboutMediaItemSchema,
    items: z.array(aboutMediaItemSchema).min(1),
  }),
});

export type AboutSectionContent = z.infer<typeof aboutSectionSchema>;