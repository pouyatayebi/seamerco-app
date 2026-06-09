import fs from "node:fs/promises";
import path from "node:path";

import { getYamlContentPath } from "@/lib/content/content-path";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getPageMediaUrl } from "@/lib/media/media-url";
import {
  usedEquipmentItemSchema,
  type UsedEquipmentItemContent,
} from "@/lib/validations/content/used-equipment-item.schema";

export type UsedEquipmentCardItem = UsedEquipmentItemContent & {
  slug: string;
  href: string;
  image: string;
};

function isItem(item: UsedEquipmentCardItem | null): item is UsedEquipmentCardItem {
  return item !== null;
}

export async function getUsedEquipmentItems(locale: "fa") {
  const itemsDir = path.dirname(
    getYamlContentPath(locale, ["used-equipment", "items"])
  );

  const entries = await fs.readdir(itemsDir, { withFileTypes: true });

  const items = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry): Promise<UsedEquipmentCardItem | null> => {
        const slug = entry.name;
        const segments = ["used-equipment", "items", slug];

        try {
          const content = await readYamlContent(
            usedEquipmentItemSchema,
            locale,
            segments
          );

          return {
            ...content,
            slug,
            href: `/used-equipment/${slug}`,
            image: getPageMediaUrl(segments, content.featuredImage),
          };
        } catch (error) {
          console.warn("Skipped invalid used equipment item", {
            slug,
            reason: error instanceof Error ? error.message : String(error),
          });

          return null;
        }
      })
  );

  return items.filter(isItem);
}