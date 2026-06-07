import fs from "node:fs/promises";
import matter from "gray-matter";
import { z, type ZodSchema } from "zod";

import { getMarkdownContentPath, type Locale } from "./content-path";

export async function readMarkdownContent<TSchema extends ZodSchema>(
  schema: TSchema,
  locale: Locale,
  segments: string[]
): Promise<{
  frontmatter: z.infer<TSchema>;
  content: string;
}> {
  const filePath = getMarkdownContentPath(locale, segments);
  const file = await fs.readFile(filePath, "utf8");
  const parsed = matter(file);

  const result = schema.safeParse(parsed.data);

  if (!result.success) {
    console.error("Invalid markdown frontmatter:", {
      filePath,
      errors: result.error.flatten(),
    });

    throw new Error(`Invalid markdown frontmatter: ${filePath}`);
  }

  return {
    frontmatter: result.data,
    content: parsed.content,
  };
}