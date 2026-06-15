import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CircleGauge } from "lucide-react";

import { IndustrialTrianglePattern } from "@/components/svg/industrial-triangle-pattern";

import { readYamlContent } from "@/lib/content/read-yaml";
import { getPageMediaUrl, getMediaUrl } from "@/lib/media/media-url";
import { siteUiSchema } from "@/lib/site/ui.schema";
import { cn } from "@/lib/utils";
import { cardSourcePageSchema } from "@/lib/validations/content/card-source-page.schema";

import type {
  CardGridReference,
  CardGridSectionContent,
} from "@/lib/validations/content/sections/card-grid.schema";

import { TomatoProcessingLineIcon } from "../svg/TomatoProcessingLineIcon";
import { TomatoPackagingLineIcon } from "../svg/TomatoPackagingLineIcon";
import { CannedBeansLineIcon } from "../svg/CannedBeansLineIcon";
import { CannedTunaLineIcon } from "../svg/CannedTunaLineIcon";
import { CannedJamFruitLineIcon } from "../svg/CannedJamFruitLineIcon";
import { CannedOlivePickledLineIcon } from "../svg/CannedOlivePickledLineIcon";
import { ProductionLinesIndustrialPattern } from "../svg/patterns/production-lines-industrial-pattern";

type HomeProductionLinesLayout = "default" | "wide";

type HomeProductionLineReference = CardGridReference & {
  description?: string;
  excerpt?: string;
  summary?: string;
  icon?: string;
};

type HomeProductionLineItem = {
  title: string;
  subtitle?: string;
  description?: string;
  href: string;
  image: string;
  capacity?: string;
  icon?: string;
};

type ProductionLineIcon = ComponentType<SVGProps<SVGSVGElement>>;

const productionLineIconMap: Record<string, ProductionLineIcon> = {
  "tomato-processing": TomatoProcessingLineIcon,
  "tomato-packaging": TomatoPackagingLineIcon,
  "canned-beans": CannedBeansLineIcon,
  "canned-tuna": CannedTunaLineIcon,
  "canned-jam-fruit": CannedJamFruitLineIcon,
  "canned-olive-pickled": CannedOlivePickledLineIcon,
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
  reference: HomeProductionLineReference,
): Promise<HomeProductionLineItem> {
  const segments = getReferenceSegments(reference);
  const page = await readYamlContent(cardSourcePageSchema, "fa", segments);

  const imageFile =
    page.featuredImage ?? page.cover ?? page.hero?.poster ?? "card.jpg";

  return {
    title: page.title ?? page.hero?.title ?? reference.slug,
    subtitle: page.subtitle ?? page.hero?.subtitle,
    description:
      reference.description ?? reference.excerpt ?? reference.summary,
    href: getReferenceHref(reference),
    image: getPageMediaUrl(segments, imageFile),
    capacity: page.capacity,
    icon: reference.icon,
  };
}

type HomeProductionLinesSectionProps = {
  content: CardGridSectionContent;
  layout?: HomeProductionLinesLayout;
};

export async function HomeProductionLinesSection({
  content,
  layout = "default",
}: HomeProductionLinesSectionProps) {
  const isWide = layout === "wide";

  const [items, ui] = await Promise.all([
    Promise.all(
      (content.items as HomeProductionLineReference[]).map(resolveReference),
    ),
    readYamlContent(siteUiSchema, "fa", ["site", "ui"]),
  ]);
  const backgroundImage = content.background
    ? getMediaUrl(["site", "defaults", content.background])
    : null;
  return (
    <section className="section relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_50%,#ffffff_100%)]">
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none absolute inset-0 z-0 object-cover"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-white/72" />
        </>
      ) : null}

<ProductionLinesIndustrialPattern
  className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
/>

      <div className="container-content relative z-10">
        <div className="mb-10 max-w-3xl text-right">
          <p className="eyebrow justify-start">
            {ui.labels.productionLinesEyebrow}
          </p>

          <h2 className="mt-3 text-balance text-2xl font-semibold leading-[1.7] text-foreground md:text-[2.05rem]">
            {content.title}
          </h2>
        </div>

        <div
          className={cn(
            "grid gap-5 md:grid-cols-2",
            isWide ? "lg:grid-cols-2 lg:gap-7" : "lg:grid-cols-3",
          )}
        >
          {items.map((item) =>
            isWide ? (
              <WideProductionLineCard
                key={item.href}
                item={item}
                capacityLabel={ui.labels.capacity}
                viewDetailsLabel={ui.labels.viewDetails}
              />
            ) : (
              <DefaultProductionLineCard
                key={item.href}
                item={item}
                capacityLabel={ui.labels.capacity}
                viewDetailsLabel={ui.labels.viewDetails}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function WideProductionLineCard({
  item,
  capacityLabel,
  viewDetailsLabel,
}: {
  item: HomeProductionLineItem;
  capacityLabel: string;
  viewDetailsLabel: string;
}) {
  const Icon = item.icon ? productionLineIconMap[item.icon] : null;

  return (
    <Link
      href={item.href}
      aria-label={`${viewDetailsLabel} ${item.title}`}
      className="group grid overflow-hidden rounded-[1.65rem] border border-border/70 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_28px_80px_rgba(0,0,0,0.15)] md:min-h-[19rem] md:grid-cols-[40%_60%]"
    >
      <div className="relative min-h-[15rem] overflow-hidden md:min-h-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 32vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent" />
      </div>

      <div className="flex min-h-[19rem] flex-col justify-between p-3 text-right">
        <div>
          <div className="mb-4 flex items-center justify-start gap-3">
            {Icon ? (
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary-foreground shadow-[0_12px_28px_rgba(0,0,0,0.14)]">
                <Icon className="size-7" />
              </span>
            ) : null}

            {item.subtitle ? (
              <h4 className="line-clamp-1 text-xs font-black leading-6 text-primary">
                {item.subtitle}
              </h4>
            ) : null}
          </div>

          <h3 className="text-lg font-semibold leading-[1.5] text-secondary md:text-2xl">
            {item.title}
          </h3>

          {item.description ? (
            <p className="mt-4 line-clamp-4 text-sm font-medium leading-8 text-content-muted">
              {item.description}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          {item.capacity ? (
            <div className="inline-flex min-h-10 items-center gap-2 rounded-full bg-surface px-4 text-xs font-black text-content-muted">
              <CircleGauge className="size-4 text-primary" />
              <span>
                {capacityLabel}: {item.capacity}
              </span>
            </div>
          ) : null}

          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-[0_10px_24px_rgba(0,0,0,0.12)] ring-1 ring-border/70 transition group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowLeft className="size-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function DefaultProductionLineCard({
  item,
  capacityLabel,
  viewDetailsLabel,
}: {
  item: HomeProductionLineItem;
  capacityLabel: string;
  viewDetailsLabel: string;
}) {
  return (
    <Link
      href={item.href}
      aria-label={`${viewDetailsLabel} ${item.title}`}
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
          <p className="mb-2 text-xs font-semibold tracking-[0.12em] text-primary">
            {item.subtitle}
          </p>
        ) : null}

        <h3 className="text-lg font-semibold leading-8 text-secondary">
          {item.title}
        </h3>

        {item.description ? (
          <p className="mt-3 line-clamp-3 text-sm font-medium leading-7 text-content-muted">
            {item.description}
          </p>
        ) : null}

        {item.capacity ? (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-xs font-bold text-content-muted">
            <CircleGauge className="size-4 text-primary" />
            <span>
              {capacityLabel}: {item.capacity}
            </span>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
