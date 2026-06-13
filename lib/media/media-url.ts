import { externalPaths } from "@/config/external-paths";

function normalizeSegment(segment: string) {
  return segment
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

export function getMediaUrl(segments: string[]) {
  const cleanBase = externalPaths.mediaBaseUrl
    .trim()
    .replace(/\/+$/, "");

  const normalizedBase = cleanBase.startsWith("/")
    ? cleanBase
    : `/${cleanBase}`;

  const cleanPath = segments
    .map(normalizeSegment)
    .join("/");

  return `${normalizedBase}/${cleanPath}`;
}

export function getPageMediaUrl(
  pageSegments: string[],
  fileName: string,
) {
  return getMediaUrl([
    ...pageSegments,
    fileName,
  ]);
}