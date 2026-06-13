"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeInfo,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { ContentActionButtons } from "@/components/shared/content-action-buttons";

import { getMediaUrl, getPageMediaUrl } from "@/lib/media/media-url";

import { cn } from "@/lib/utils";

import type { SiteUiContent } from "@/lib/site/ui.schema";

import type { ContentOverviewSectionContent } from "@/lib/validations/content/sections/content-overview.schema";

type ContentOverviewSectionProps = {
  overview?: ContentOverviewSectionContent;
  mediaSegments: string[];
  fallbackImage?: string;
  fallbackAlt?: string;
  ui: SiteUiContent;
};

export function ContentOverviewSection({
  overview,
  mediaSegments,
  fallbackImage,
  fallbackAlt = "تصویر سیمرکو",
  ui,
}: ContentOverviewSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateActiveSlide = () =>
      setActiveSlide(api.selectedScrollSnap());

    updateActiveSlide();

    api.on("select", updateActiveSlide);
    api.on("reInit", updateActiveSlide);

    return () => {
      api.off("select", updateActiveSlide);
      api.off("reInit", updateActiveSlide);
    };
  }, [api]);

  const safeSlides = useMemo(() => {
    const slides =
      overview?.slides
        ?.filter((slide) => slide.src)
        .map((slide) => ({
          src: getPageMediaUrl(mediaSegments, slide.src),
          alt: slide.alt ?? overview.title ?? fallbackAlt,
        })) ?? [];

    if (slides.length) return slides;

    if (fallbackImage) {
      return [
        {
          src: fallbackImage,
          alt: fallbackAlt,
        },
      ];
    }

    return [
      {
        src: getMediaUrl([
          "site",
          "defaults",
          "card.jpg",
        ]),
        alt: fallbackAlt,
      },
    ];
  }, [
    fallbackAlt,
    fallbackImage,
    mediaSegments,
    overview,
  ]);

  if (!overview) return null;

  return (
    <section className="section bg-[linear-gradient(135deg,var(--background)_0%,var(--surface)_52%,var(--background)_100%)]">
      <div className="container-content">
        <div className="grid gap-8 [direction:ltr] lg:grid-cols-[1fr_25rem] lg:items-center xl:grid-cols-[1fr_28rem]">
          <div className="[direction:rtl]">
            <div className="max-w-4xl text-right">
              {overview.titleEn ? (
                <p className="mb-2 text-[0.72rem] font-black uppercase tracking-[0.28em] text-primary">
                  {overview.titleEn}
                </p>
              ) : null}

              {overview.title ? (
                <h2 className="text-balance text-[1.85rem] font-semibold leading-[1.7] text-foreground md:text-[2.35rem]">
                  {overview.title}
                </h2>
              ) : null}

              {(overview.code || overview.capacity) ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {overview.code ? (
                    <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-black text-primary">
                      {ui.labels.code}: {overview.code}
                    </span>
                  ) : null}

                  {overview.capacity ? (
                    <span className="rounded-full border border-secondary/15 bg-secondary/5 px-3 py-1 text-xs font-black text-secondary">
                      {ui.labels.capacity}:{" "}
                      {overview.capacity}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>

            {overview.paragraphs.length ? (
              <div className="mt-5 max-w-4xl space-y-2 text-justify text-[0.86rem] leading-7 text-content md:text-[0.9rem]">
                {overview.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-2">
                <ContentActionButtons
                  catalogHref={overview.catalogHref}
                  proformaHref={overview.proformaHref}
                />
              </div>

              {overview.usedMachineHref ? (
                <Link
                  href={overview.usedMachineHref}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-content-muted transition hover:text-primary"
                >
                  <BadgeInfo className="size-3.5 text-primary" />

                  {overview.usedMachineLabel ??
                    ui.labels.usedMachines}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="relative [direction:rtl]">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-white p-2 shadow-[0_24px_70px_rgb(0_0_0/0.12)]">
              <Carousel
                setApi={setApi}
                opts={{
                  loop: true,
                  direction: "rtl",
                }}
                className="w-full"
              >
                <CarouselContent>
                  {safeSlides.map((slide, index) => (
                    <CarouselItem
                      key={`${slide.src}-${index}`}
                      className="basis-full"
                    >
                      <div className="relative aspect-[0.88/1] overflow-hidden rounded-[1.55rem] bg-muted">
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          priority={index === 0}
                          sizes="(min-width:1280px) 448px,(min-width:1024px) 400px,100vw"
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/22 via-transparent to-transparent" />

                        {safeSlides.length > 1 ? (
                          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-secondary shadow-sm">
                            {activeSlide + 1} /{" "}
                            {safeSlides.length}
                          </div>
                        ) : null}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {safeSlides.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => api?.scrollPrev()}
                      className="absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-secondary shadow-md transition hover:bg-primary hover:text-primary-foreground"
                    >
                      <ChevronRight className="size-5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => api?.scrollNext()}
                      className="absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-secondary shadow-md transition hover:bg-primary hover:text-primary-foreground"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                  </>
                ) : null}
              </Carousel>
            </div>

            {safeSlides.length > 1 ? (
              <div className="mx-auto mt-3 grid max-w-[17rem] grid-cols-4 gap-1.5">
                {safeSlides.slice(0, 4).map((slide, index) => (
                  <button
                    key={`${slide.src}-thumb-${index}`}
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-lg border bg-muted transition",
                      activeSlide === index
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />

                    {index === 3 &&
                    safeSlides.length > 4 ? (
                      <span className="absolute inset-0 flex items-center justify-center bg-secondary/60 text-xs font-black text-white">
                        +
                        {safeSlides.length - 4}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-content-muted">
                <ImageIcon className="size-4 text-primary" />
                <span>{safeSlides[0]?.alt}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}