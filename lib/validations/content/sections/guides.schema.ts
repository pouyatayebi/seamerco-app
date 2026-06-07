import { z } from "zod";

const guideItemSchema = z.object({
  titleTop: z.string().min(1),
  titleBottom: z.string().min(1),
  description: z.string().min(1),
  buttonTextTop: z.string().min(1),
  buttonTextBottom: z.string().min(1),
  image: z.string().min(1),
  video: z.string().min(1),
  href: z.string().min(1),
});

export const guidesSectionSchema = z.object({
  items: z.array(guideItemSchema).min(1),
});

export type GuidesSectionContent = z.infer<typeof guidesSectionSchema>;
export type GuideItem = GuidesSectionContent["items"][number];