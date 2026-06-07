import fs from "node:fs/promises";

import YAML from "yaml";
import { z, type ZodSchema } from "zod";

import { getYamlContentPath, type Locale } from "./content-path";

export async function readYamlContent<TSchema extends ZodSchema>(
  schema: TSchema,
  locale: Locale,
  segments: string[]
): Promise<z.infer<TSchema>> {
  const filePath = getYamlContentPath(locale, segments);
  const file = await fs.readFile(filePath, "utf8");
  const rawContent = YAML.parse(file);

  const parsed = schema.safeParse(rawContent);

  if (!parsed.success) {
    console.error("Invalid YAML content:", {
      filePath,
      errors: parsed.error.flatten(),
    });

    throw new Error(`Invalid YAML content: ${filePath}`);
  }

  return parsed.data;
}