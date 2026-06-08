import fs from "node:fs/promises";
import path from "node:path";

import { getYamlContentPath } from "@/lib/content/content-path";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getPageMediaUrl } from "@/lib/media/media-url";
import { cardSourcePageSchema } from "@/lib/validations/content/card-source-page.schema";
import { machineryCategorySchema } from "@/lib/validations/content/machinery-category.schema";

export type MachineryIndexCategory = {
  slug: string;
  title: string;
};

export type MachineryIndexItem = {
  title: string;
  subtitle?: string;
  excerpt?: string;
  image: string;
  href: string;
  capacity?: string;
  code?: string;
  categorySlug: string;
  categoryTitle: string;
  relatedSolutions: string[];
};

function isNotNull<T>(item: T | null): item is T {
  return item !== null;
}

export async function getMachineryIndexData(locale: "fa") {
  const machineryDir = path.dirname(getYamlContentPath(locale, ["machinery"]));

  const categoryEntries = await fs.readdir(machineryDir, {
    withFileTypes: true,
  });

  const categorySlugs = categoryEntries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const categories = (
    await Promise.all(
      categorySlugs.map(async (categorySlug) => {
        try {
          const category = await readYamlContent(
            machineryCategorySchema,
            locale,
            ["machinery", categorySlug]
          );

          return {
            slug: categorySlug,
            title: category.title,
          } satisfies MachineryIndexCategory;
        } catch {
          return null;
        }
      })
    )
  ).filter(isNotNull);

  const products = (
    await Promise.all(
      categories.flatMap((category) =>
        categorySlugs
          .filter((slug) => slug === category.slug)
          .map(async (categorySlug) => {
            const categoryDir = path.dirname(
              getYamlContentPath(locale, ["machinery", categorySlug])
            );

            const productEntries = await fs.readdir(categoryDir, {
              withFileTypes: true,
            });

            return Promise.all(
              productEntries
                .filter((entry) => entry.isDirectory())
                .map(async (entry) => {
                  const productSlug = entry.name;
                  const segments = ["machinery", categorySlug, productSlug];

                  try {
                    const product = await readYamlContent(
                      cardSourcePageSchema,
                      locale,
                      segments
                    );

                    const imageFile =
                      product.featuredImage ??
                      product.cover ??
                      product.hero?.poster ??
                      "card.webp";

                    return {
                      title: product.title ?? product.hero?.title ?? productSlug,
                      subtitle: product.subtitle ?? product.hero?.subtitle,
                      excerpt:
                        product.excerpt ??
                        product.content ??
                        product.overview?.paragraphs?.[0],
                      image: getPageMediaUrl(segments, imageFile),
                      href: `/${segments.join("/")}`,
                      capacity: product.capacity,
                      code: product.code,
                      categorySlug,
                      categoryTitle: category.title,
                      relatedSolutions: product.relatedSolutions,
                    } satisfies MachineryIndexItem;
                  } catch {
                    return null;
                  }
                })
            );
          })
      )
    )
  )
    .flat()
    .filter(isNotNull);

  return {
    categories,
    products,
  };
}