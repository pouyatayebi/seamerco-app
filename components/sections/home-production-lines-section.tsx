import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CircleGauge } from "lucide-react";

import { IndustrialTrianglePattern } from "@/components/svg/industrial-triangle-pattern";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getPageMediaUrl } from "@/lib/media/media-url";
import { cardSourcePageSchema } from "@/lib/validations/content/card-source-page.schema";
import { siteUiSchema } from "@/lib/site/ui.schema";

import type {
  CardGridReference,
  CardGridSectionContent,
} from "@/lib/validations/content/sections/card-grid.schema";

type HomeProductionLineItem = {
  title: string;
  subtitle?: string;
  href: string;
  image: string;
  capacity?: string;
};

function getReferenceSegments(reference: CardGridReference) {
  if (reference.type === "solution") return ["solutions", reference.slug];

  if (reference.type === "machinery") {
    return ["machinery", reference.categorySlug, reference.slug];
  }

  return ["projects", reference.slug];
}

function getReferenceHref(reference: CardGridReference) {
  return `/${getReferenceSegments(reference).join("/")}`;
}

async function resolveReference(
  reference: CardGridReference,
): Promise<HomeProductionLineItem> {
  const segments = getReferenceSegments(reference);

  const page = await readYamlContent(cardSourcePageSchema, "fa", segments);

  const imageFile =
    page.featuredImage ?? page.cover ?? page.hero?.poster ?? "card.jpg";

  return {
    title: page.title ?? page.hero?.title ?? reference.slug,
    subtitle: page.subtitle ?? page.hero?.subtitle,
    href: getReferenceHref(reference),
    image: getPageMediaUrl(segments, imageFile),
    capacity: page.capacity,
  };
}

type HomeProductionLinesSectionProps = {
  content: CardGridSectionContent;
};

export async function HomeProductionLinesSection({
  content,
}: HomeProductionLinesSectionProps) {
  const [items, ui] = await Promise.all([
    Promise.all(content.items.map(resolveReference)),
    readYamlContent(siteUiSchema, "fa", ["site", "ui"]),
  ]);

  return (
    <section className="section relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_50%,#ffffff_100%)]">
      <IndustrialTrianglePattern className="hidden lg:block pointer-events-none absolute inset-0 h-full w-full text-secondary/28 [--pattern-accent:hsl(var(--primary))]" />

      <div className="container-content relative z-10">
        <div className="mb-10 max-w-3xl text-right">
          <p className="eyebrow justify-start">
            {ui.labels.productionLinesEyebrow}
          </p>

          <h2 className="mt-3 text-balance text-2xl font-semibold leading-[1.7] text-foreground md:text-[2.05rem]">
            {content.title}
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={`${ui.labels.viewDetails} ${item.title}`}
              className="group overflow-hidden rounded-[1.35rem] border border-border/70 bg-white shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_22px_55px_rgba(0,0,0,0.12)]"
            >
              <div className="relative aspect-[1.75/1] overflow-hidden bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-secondary/75 via-secondary/10 to-transparent" />

                <span className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowLeft className="size-5" />
                </span>
              </div>

              <div className="p-5 text-right">
                {item.subtitle ? (
                  <p className="mb-2 text-xs font-black tracking-[0.12em] text-primary">
                    {item.subtitle}
                  </p>
                ) : null}

                <h3 className="text-lg font-black leading-8 text-secondary">
                  {item.title}
                </h3>

                {item.capacity ? (
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-xs font-bold text-content-muted">
                    <CircleGauge className="size-4 text-primary" />
                    <span>
                      {ui.labels.capacity}: {item.capacity}
                    </span>
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}