import { z } from "zod";

export const headerContentSchema = z.object({
  topBar: z.object({
    technicalRequestLabel: z.string().min(1),
  }),

  technicalDialog: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    whatsappButtonLabel: z.string().min(1),
  }),
});

export type HeaderContent = z.infer<typeof headerContentSchema>;