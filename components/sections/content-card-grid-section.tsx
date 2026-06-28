import {
  ExpandableCardGrid,
  type ExpandableCardGridItem,
} from "@/components/shared/expandable-card-grid";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getPageMediaUrl } from "@/lib/media/media-url";
import { cardSourcePageSchema } from "@/lib/validations/content/card-source-page.schema";
import type {
  CardGridInlineItem,
  CardGridItem,
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

function isInlineCardItem(item: CardGridItem): item is CardGridInlineItem {
  return "title" in item && "href" in item;
}

function resolveInlineImage(image: string | undefined, mediaSegments?: string[]) {
  if (!image) return undefined;

  if (
    image.startsWith("/") ||
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return mediaSegments?.length ? getPageMediaUrl(mediaSegments, image) : image;
}

function resolveInlineItem(
  item: CardGridInlineItem,
  mediaSegments?: string[],
): ExpandableCardGridItem {
  return {
    title: item.title,
    subtitle: item.subtitle,
    href: item.href,
    image: resolveInlineImage(item.image, mediaSegments),
    excerpt: item.summary ?? item.excerpt ?? item.description,
    description: item.description ?? item.summary ?? item.excerpt,
    capacity: item.capacity,
    code: item.code,
  };
}

async function resolveReference(
  reference: CardGridReference,
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
    excerpt: reference.summary ?? reference.description ?? page.excerpt,
    description:
      reference.description ??
      reference.summary ??
      page.content ??
      page.overview?.paragraphs?.join("\n\n") ??
      page.excerpt,
    capacity: page.capacity,
    code: page.code,
  };
}

async function resolveCardGridItem(
  item: CardGridItem,
  mediaSegments?: string[],
): Promise<ExpandableCardGridItem> {
  if (isInlineCardItem(item)) {
    return resolveInlineItem(item, mediaSegments);
  }

  return resolveReference(item);
}

type ContentCardGridSectionProps = {
  content: CardGridSectionContent;
  mediaSegments?: string[];
};

export async function ContentCardGridSection({
  content,
  mediaSegments,
}: ContentCardGridSectionProps) {
  const items = await Promise.all(
    content.items.map((item) => resolveCardGridItem(item, mediaSegments)),
  );

  return (
    <ExpandableCardGrid
      title={content.title}
      items={items}
      detailButtonLabel={content.detailButtonLabel}
    />
  );
}
