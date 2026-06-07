import { externalPaths } from "@/config/external-paths";

export function getMediaUrl(segments: string[]) {
  const cleanBase = externalPaths.mediaBaseUrl
    .trim()
    .replace(/\/+$/, "");

  const normalizedBase = cleanBase.startsWith("/")
    ? cleanBase
    : `/${cleanBase}`;

  const cleanPath = segments
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${normalizedBase}/${cleanPath}`;
}

export function getPageMediaUrl(pageSegments: string[], fileName: string) {
  return getMediaUrl([...pageSegments, fileName]);
}