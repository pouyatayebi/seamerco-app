"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Maximize2,
  Video,
  X,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { VideoLightbox } from "@/components/shared/video-lightbox";
import { MediaGalleryIndustrialPattern } from "@/components/svg/patterns/media-gallery-industrial-pattern";
import { getPageMediaUrl } from "@/lib/media/media-url";
import { cn } from "@/lib/utils";
import type { MediaGallerySectionContent } from "@/lib/validations/content/sections/media-gallery.schema";

type MediaGallerySectionProps = {
  content?: MediaGallerySectionContent;
  mediaSegments: string[];
};

export function MediaGallerySection({
  content,
  mediaSegments,
}: MediaGallerySectionProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const imageItems = useMemo(
    () =>
      content?.items
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => item.type === "image") ?? [],
    [content?.items],
  );

  if (!content?.items?.length) return null;

  function openImage(originalIndex: number) {
    const imageIndex = imageItems.findIndex(
      ({ index }) => index === originalIndex,
    );

    if (imageIndex >= 0) setActiveImageIndex(imageIndex);
  }

  function goNext() {
    if (activeImageIndex === null || !imageItems.length) return;

    setActiveImageIndex((activeImageIndex + 1) % imageItems.length);
  }

  function goPrev() {
    if (activeImageIndex === null || !imageItems.length) return;

    setActiveImageIndex(
      (activeImageIndex - 1 + imageItems.length) % imageItems.length,
    );
  }

  const activeImage =
    activeImageIndex !== null ? imageItems[activeImageIndex]?.item : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: content.title,
    description: content.description,
    itemListElement: content.items.map((item, index) => {
      const url = getPageMediaUrl(mediaSegments, item.src);

      return {
        "@type": "ListItem",
        position: index + 1,
        item:
          item.type === "video"
            ? {
                "@type": "VideoObject",
                name: item.title,
                description: item.description,
                contentUrl: url,
                thumbnailUrl: item.poster
                  ? getPageMediaUrl(mediaSegments, item.poster)
                  : undefined,
              }
            : {
                "@type": "ImageObject",
                name: item.title,
                description: item.description,
                contentUrl: url,
              },
      };
    }),
  };

  return (
    <section className="section relative overflow-hidden bg-[linear-gradient(135deg,var(--background)_0%,var(--surface)_50%,var(--background)_100%)]">
      <MediaGalleryIndustrialPattern
        className="hidden lg:block pointer-events-none absolute inset-0 hidden h-full w-full text-secondary/18 md:block [--pattern-accent:var(--primary)]"
        accentOpacity={0.2}
        shapeOpacity={0.12}
        lineOpacity={0.08}
      />

      <Container size="content" className="relative z-10">
        <div className="mb-10 max-w-4xl text-right">
          {content.eyebrow ? (
            <p className="eyebrow justify-start">{content.eyebrow}</p>
          ) : null}

          <h2 className="mt-3 text-2xl font-semibold leading-[1.7] text-foreground md:text-[2.05rem]">
            {content.title}
          </h2>

          {content.description ? (
            <p className="lead mt-5 text-justify">{content.description}</p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => {
            const src = getPageMediaUrl(mediaSegments, item.src);
            const poster = item.poster
              ? getPageMediaUrl(mediaSegments, item.poster)
              : undefined;

            const isVideo = item.type === "video";

            return (
              <figure
                key={`${item.src}-${index}`}
                className="group overflow-hidden rounded-[1.6rem] border border-border/70 bg-white shadow-[0_16px_45px_rgb(0_0_0/0.08)] transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_26px_70px_rgb(0_0_0/0.13)]"
              >
                <div className="relative aspect-[1.55/1] overflow-hidden bg-muted">
                  {isVideo ? (
                    <VideoLightbox
                      image={poster ?? src}
                      video={src}
                      alt={item.alt ?? item.title}
                      title={item.title}
                      playSize="lg"
                      className="size-full rounded-none"
                      imageClassName="rounded-none"
                      overlayClassName="bg-secondary/20 group-hover:bg-secondary/35"
                      dialogClassName="max-w-5xl"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => openImage(index)}
                      className="relative block size-full"
                      aria-label={`مشاهده تصویر ${item.title}`}
                    >
                      <Image
                        src={src}
                        alt={item.alt ?? item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />

                      <span className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/90 text-secondary shadow-sm transition group-hover:bg-primary group-hover:text-primary-foreground">
                        <Maximize2 className="size-4" />
                      </span>
                    </button>
                  )}

                  <div className="pointer-events-none absolute right-4 top-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.68rem] font-black shadow-sm",
                        isVideo
                          ? "bg-primary text-primary-foreground"
                          : "bg-white/92 text-secondary",
                      )}
                    >
                      {isVideo ? (
                        <>
                          <Video className="size-3.5" />
                          ویدئو
                        </>
                      ) : (
                        <>
                          <ImageIcon className="size-3.5" />
                          تصویر
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <figcaption className="p-5 text-right">
                  <h3 className="text-base font-black leading-7 text-secondary">
                    {item.title}
                  </h3>

                  {item.description ? (
                    <p className="mt-2 text-sm leading-7 text-content-muted">
                      {item.description}
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Container>

      {activeImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="بستن گالری"
          >
            <X className="size-5" />
          </button>

          {imageItems.length > 1 ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute right-4 top-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="تصویر قبلی"
              >
                <ChevronRight className="size-6" />
              </button>

              <button
                type="button"
                onClick={goNext}
                className="absolute left-4 top-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="تصویر بعدی"
              >
                <ChevronLeft className="size-6" />
              </button>
            </>
          ) : null}

          <div className="w-full max-w-5xl">
            <div className="relative mx-auto aspect-[1.6/1] max-h-[75vh] overflow-hidden rounded-[1.5rem] bg-black">
              <Image
                src={getPageMediaUrl(mediaSegments, activeImage.src)}
                alt={activeImage.alt ?? activeImage.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="mx-auto mt-4 max-w-3xl text-center text-white">
              <h3 className="text-lg font-black text-white">
                {activeImage.title}
              </h3>

              {activeImage.description ? (
                <p className="mt-2 text-sm leading-7 text-white/75">
                  {activeImage.description}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}