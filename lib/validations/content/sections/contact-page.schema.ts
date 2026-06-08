import { z } from "zod";

export const contactPersonSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  image: z.string().min(1),
  fallback: z.string().min(1),
  linkedin: z.string().min(1),
});

export const contactPageSchema = z.object({
  intro: z.object({
    eyebrow: z.string().optional(),
    title: z.string().min(1),
    description: z.string().min(1),
    notes: z.array(z.string().min(1)).default([]),
  }),

  people: z.object({
    title: z.string().min(1),
    items: z.array(contactPersonSchema).default([]),
  }),

  addresses: z.object({
    officeTitle: z.string().min(1),
    officeMapLabel: z.string().min(1),
    workshopTitle: z.string().min(1),
    workshopMapLabel: z.string().min(1),
  }),

  quickActions: z.object({
    callLabel: z.string().min(1),
    whatsappLabel: z.string().min(1),
  }),
});

export type ContactPageContent = z.infer<typeof contactPageSchema>;