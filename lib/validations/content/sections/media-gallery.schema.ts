import { z } from "zod";

export const mediaGalleryItemSchema = z.object({
  type: z.enum(["image", "video"]),
  src: z.string(),
  poster: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  alt: z.string().optional(),
});

export const mediaGallerySectionSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  items: z.array(mediaGalleryItemSchema).default([]),
});

export type MediaGallerySectionContent = z.infer<
  typeof mediaGallerySectionSchema
>;