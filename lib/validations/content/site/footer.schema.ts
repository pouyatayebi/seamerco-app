import { z } from "zod";

export const footerContentSchema = z.object({
  notice: z.string().min(1),
  copyright: z.string().min(1),
});

export type FooterContent = z.infer<typeof footerContentSchema>;