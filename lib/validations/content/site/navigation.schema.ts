import { z } from "zod";

const navigationLinkSchema = z.object({
  title: z.string().min(1),
  href: z.string().min(1),
});

export const navigationSchema = z.object({
  items: z.array(
    navigationLinkSchema.extend({
      links: z.array(navigationLinkSchema).optional(),
    })
  ),
});

export type NavigationContent = z.infer<typeof navigationSchema>;
export type NavigationItem = NavigationContent["items"][number];