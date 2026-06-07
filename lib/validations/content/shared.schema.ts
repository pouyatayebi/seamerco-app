import { z } from "zod";

export const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const mediaFileSchema = z.string().min(1);

export const specificationItemSchema = z.object({
  title: z.string().min(1),
  value: z.string().min(1),
});