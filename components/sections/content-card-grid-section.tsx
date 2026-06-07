import {
  ExpandableCardGrid,
  type ExpandableCardGridItem,
} from "@/components/shared/expandable-card-grid";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getPageMediaUrl } from "@/lib/media/media-url";
import { cardSourcePageSchema } from "@/lib/validations/content/card-source-page.schema";
import type {
  CardGridReference,
  CardGridSectionContent,
} from "@/lib/validations/content/sections/card-grid.schema";

function getReferenceSegments(reference: CardGridReference) {
  if (reference.type === "solution") {
    return ["solutions", reference.slug];
  }

  if (reference.type === "machinery") {
    return ["machinery", reference.categorySlug, reference.slug];
  }

  return ["projects", reference.slug];
}

function getReferenceHref(reference: CardGridReference) {
  return `/${getReferenceSegments(reference).join("/")}`;
}

async function resolveReference(
  reference: CardGridReference
): Promise<ExpandableCardGridItem> {
  const segments = getReferenceSegments(reference);
  const page = await readYamlContent(cardSourcePageSchema, "fa", segments);

  const imageFile =
    page.featuredImage ?? page.cover ?? page.hero?.poster ?? "card.jpg";

  return {
    title: page.title ?? page.hero?.title ?? reference.slug,
    subtitle: page.subtitle ?? page.hero?.subtitle,
    href: getReferenceHref(reference),
    image: getPageMediaUrl(segments, imageFile),
    excerpt: page.excerpt,
    description:
      page.content ??
      page.overview?.paragraphs?.join("\n\n") ??
      page.excerpt,
    capacity: page.capacity,
    code: page.code,
  };
}

type ContentCardGridSectionProps = {
  content: CardGridSectionContent;
};

export async function ContentCardGridSection({
  content,
}: ContentCardGridSectionProps) {
  const items = await Promise.all(content.items.map(resolveReference));

  return (
    <ExpandableCardGrid
      title={content.title}
      items={items}
      detailButtonLabel={content.detailButtonLabel}
    />
  );
}