import { z } from "zod";

export const blogCardSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  date: z.string().optional(),
});

export type BlogCardContent = z.infer<typeof blogCardSchema>;