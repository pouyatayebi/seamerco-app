import fs from "node:fs/promises";

import { getMarkdownContentPath } from "./content-path";
import type { Locale } from "./content-path";

export async function readRawMarkdown(
  locale: Locale,
  segments: string[],
): Promise<string | null> {
  try {
    const filePath = getMarkdownContentPath(locale, segments);

    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}