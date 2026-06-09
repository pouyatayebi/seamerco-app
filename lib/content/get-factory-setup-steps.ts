import { readYamlContent } from "@/lib/content/read-yaml";
import { getPageMediaUrl } from "@/lib/media/media-url";
import { factorySetupStepSchema } from "@/lib/validations/content/factory-setup-step.schema";

export type FactorySetupRoadmapStep = {
  slug: string;
  order: number;
  title: string;
  subtitle?: string;
  excerpt?: string;
  image: string;
  href: string;
  duration?: string;
  output?: string;
};

export async function getFactorySetupSteps(
  locale: "fa",
  steps: {
    slug: string;
    order: number;
  }[]
): Promise<FactorySetupRoadmapStep[]> {
  const sortedSteps = [...steps].sort((a, b) => a.order - b.order);

  const items = await Promise.all(
    sortedSteps.map(async (step) => {
      const segments = ["factory-setup", step.slug];

      const content = await readYamlContent(
        factorySetupStepSchema,
        locale,
        segments
      );

      const imageFile =
        content.featuredImage ??
        content.cover ??
        content.hero?.poster ??
        "card.webp";

      return {
        slug: step.slug,
        order: step.order,
        title: content.title ?? content.hero?.title ?? step.slug,
        subtitle: content.subtitle ?? content.hero?.subtitle,
        excerpt:
          content.excerpt ??
          content.summary?.description ??
          "مرحله‌ای از مسیر راه‌اندازی کارخانه با همراهی تیم فنی و اجرایی سیمرکو.",
        image: getPageMediaUrl(segments, imageFile),
        href: `/${segments.join("/")}`,
        duration: content.duration,
        output: content.output,
      };
    })
  );

  return items;
}