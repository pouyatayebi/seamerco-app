"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { ContentActionButtons } from "@/components/shared/content-action-buttons";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getMediaUrl, getPageMediaUrl } from "@/lib/media/media-url";
import type { ContentOverviewSectionContent } from "@/lib/validations/content/sections/content-overview.schema";

type ContentOverviewSectionProps = {
  overview?: ContentOverviewSectionContent;
  mediaSegments: string[];
  fallbackImage?: string;
  fallbackAlt?: string;
};

export function ContentOverviewSection({
  overview,
  mediaSegments,
  fallbackImage,
  fallbackAlt = "تصویر سیمرکو",
}: ContentOverviewSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateActiveSlide = () => {
      setActiveSlide(api.selectedScrollSnap());
    };

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
          alt: fallbackAlt ?? overview?.title ?? "تصویر سیمرکو",
        },
      ];
    }

    return [
      {
        src: getMediaUrl(["site", "defaults", "card.jpg"]),
        alt: fallbackAlt ?? overview?.title ?? "تصویر سیمرکو",
      },
    ];
  }, [fallbackAlt, fallbackImage, mediaSegments, overview]);

  if (!overview) return null;

  return (
    <section className="section bg-background">
      <div className="container-content">
        <div className="mx-auto grid max-w-6xl gap-8 [direction:ltr] lg:grid-cols-[1fr_22rem] lg:items-center lg:gap-12">
          <div className="[direction:rtl]">
            {overview.title ? (
              <h2 className="section-title">{overview.title}</h2>
            ) : null}

            {overview.paragraphs.length ? (
              <div className="mt-5 space-y-2 text-justify text-[0.84rem] leading-7 text-content">
                {overview.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            <div className="mt-6 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
              {overview.specs.length ? (
                <ul className="list-disc space-y-1.5 pr-5 text-[0.84rem] leading-7 text-content">
                  {overview.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              ) : null}

              <ContentActionButtons
                catalogHref={overview.catalogHref}
                proformaHref={overview.proformaHref}
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] [direction:rtl]">
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
                    <div className="relative aspect-[0.82/1] overflow-hidden rounded-[2rem]">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        sizes="(min-width: 1024px) 352px, 100vw"
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/15 to-transparent" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {safeSlides.length > 1 ? (
                <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
                  {safeSlides.map((slide, index) => (
                    <button
                      key={`${slide.src}-dot-${index}`}
                      type="button"
                      aria-label={`نمایش تصویر ${index + 1}`}
                      onClick={() => api?.scrollTo(index)}
                      className={
                        activeSlide === index
                          ? "size-2 rounded-full bg-primary"
                          : "size-2 rounded-full bg-white/85 transition hover:bg-white"
                      }
                    />
                  ))}
                </div>
              ) : null}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}