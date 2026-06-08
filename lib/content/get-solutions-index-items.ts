import fs from "node:fs/promises";
import path from "node:path";

import type { ExpandableCardGridItem } from "@/components/shared/expandable-card-grid";
import { getYamlContentPath } from "@/lib/content/content-path";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getPageMediaUrl } from "@/lib/media/media-url";
import { cardSourcePageSchema } from "@/lib/validations/content/card-source-page.schema";

function isItem(item: ExpandableCardGridItem | null): item is ExpandableCardGridItem {
  return item !== null;
}

export async function getSolutionsIndexItems(
  locale: "fa"
): Promise<ExpandableCardGridItem[]> {
  const solutionsDir = path.dirname(getYamlContentPath(locale, ["solutions"]));

  const entries = await fs.readdir(solutionsDir, { withFileTypes: true });

  const items = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry): Promise<ExpandableCardGridItem | null> => {
        const slug = entry.name;
        const segments = ["solutions", slug];

        try {
          const content = await readYamlContent(
            cardSourcePageSchema,
            locale,
            segments
          );

          const imageFile =
            content.featuredImage ??
            content.cover ??
            content.hero?.poster ??
            "card.webp";

          return {
            title: content.title ?? content.hero?.title ?? slug,
            subtitle: content.subtitle ?? content.hero?.subtitle,
            href: `/${segments.join("/")}`,
            image: getPageMediaUrl(segments, imageFile),
            excerpt:
              content.excerpt ??
              content.content ??
              content.overview?.paragraphs?.[0],
            description:
              content.content ??
              content.overview?.paragraphs?.join("\n\n") ??
              content.excerpt,
            capacity: content.capacity,
            code: content.code,
          };
        } catch (error) {
          console.warn("Skipped invalid solution item", {
            path: `seamerco-content/fa/${segments.join("/")}/index.yaml`,
            slug,
            reason: error instanceof Error ? error.message : String(error),
          });

          return null;
        }
      })
  );

  return items.filter(isItem);
}