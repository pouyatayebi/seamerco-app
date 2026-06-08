import { z } from "zod";

const aboutVideoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  image: z.string().min(1),
  video: z.string().min(1),
});

export const aboutPageSchema = z.object({
  story: z.object({
    eyebrow: z.string().optional(),
    title: z.string().min(1),
    lead: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).default([]),
    stats: z
      .array(
        z.object({
          value: z.string().min(1),
          label: z.string().min(1),
        })
      )
      .default([]),
  }),

  capabilities: z.object({
    eyebrow: z.string().optional(),
    title: z.string().min(1),
    description: z.string().min(1),
    items: z
      .array(
        z.object({
          title: z.string().min(1),
          description: z.string().min(1),
        })
      )
      .default([]),
  }),

  timeline: z.object({
    title: z.string().min(1),
    items: z
      .array(
        z.object({
          year: z.string().min(1),
          title: z.string().min(1),
          description: z.string().min(1),
        })
      )
      .default([]),
  }),

  media: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    items: z.array(aboutVideoSchema).default([]),
  }),
});

export type AboutPageContent = z.infer<typeof aboutPageSchema>;