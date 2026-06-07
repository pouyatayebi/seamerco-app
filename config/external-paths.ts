import path from "node:path";

function resolveExternalPath(value: string) {
  if (path.isAbsolute(value)) {
    return value;
  }

  return path.resolve(process.cwd(), value);
}

export const externalPaths = {
  contentRoot: resolveExternalPath(
    process.env.SEAMERCO_CONTENT_ROOT ?? "../seamerco-content"
  ),

  mediaBaseUrl: process.env.SEAMERCO_MEDIA_BASE_URL ?? "/media",

  mediaOrigin: process.env.SEAMERCO_MEDIA_ORIGIN ?? "",
} as const;