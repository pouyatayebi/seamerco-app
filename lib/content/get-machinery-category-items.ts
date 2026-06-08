import fs from "node:fs/promises";
import path from "node:path";

import type { ExpandableCardGridItem } from "@/components/shared/expandable-card-grid";
import { getYamlContentPath } from "@/lib/content/content-path";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getPageMediaUrl } from "@/lib/media/media-url";
import { cardSourcePageSchema } from "@/lib/validations/content/card-source-page.schema";

function isExpandableCardGridItem(
  item: ExpandableCardGridItem | null
): item is ExpandableCardGridItem {
  return item !== null;
}

export async function getMachineryCategoryItems(
  locale: "fa",
  categorySlug: string
): Promise<ExpandableCardGridItem[]> {
  const categoryDir = path.dirname(
    getYamlContentPath(locale, ["machinery", categorySlug])
  );

  const entries = await fs.readdir(categoryDir, {
    withFileTypes: true,
  });

  const slugs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const items: Array<ExpandableCardGridItem | null> = await Promise.all(
    slugs.map(async (slug): Promise<ExpandableCardGridItem | null> => {
      const segments = ["machinery", categorySlug, slug];

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
          excerpt: content.excerpt,
          description:
            content.content ??
            content.overview?.paragraphs?.join("\n\n") ??
            content.excerpt,
          capacity: content.capacity,
          code: content.code,
        };
      } catch (error) {
        console.warn("Skipped invalid machinery item", {
          path: `seamerco-content/fa/${segments.join("/")}/index.yaml`,
          slug,
          reason: error instanceof Error ? error.message : String(error),
        });

        return null;
      }
    })
  );

  return items.filter(isExpandableCardGridItem);
}