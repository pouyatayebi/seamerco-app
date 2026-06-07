import path from "node:path";

import { externalPaths } from "@/config/external-paths";

export type Locale = "fa";

export function getContentDirectory(locale: Locale, segments: string[]) {
  return path.join(externalPaths.contentRoot, locale, ...segments);
}

export function getYamlContentPath(locale: Locale, segments: string[]) {
  return path.join(getContentDirectory(locale, segments), "index.yaml");
}

export function getMarkdownContentPath(locale: Locale, segments: string[]) {
  return path.join(getContentDirectory(locale, segments), "index.md");
}