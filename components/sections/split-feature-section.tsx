import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getPageMediaUrl } from "@/lib/media/media-url";
import { cn } from "@/lib/utils";
import type { SplitFeatureSectionContent } from "@/lib/validations/content/sections/split-feature.schema";

type SplitFeatureImagePosition = "left" | "right";

type SplitFeatureSectionProps = {
  content?: SplitFeatureSectionContent;
  mediaSegments: string[];
  imagePosition?: SplitFeatureImagePosition;
};

export function SplitFeatureSection({
  content,
  mediaSegments,
  imagePosition = "left",
}: SplitFeatureSectionProps) {
  if (!content) return null;

  const imageSrc = content.image?.src
    ? getPageMediaUrl(mediaSegments, content.image.src)
    : null;

  const hasImage = Boolean(imageSrc);

 return (
  <section className="relative overflow-hidden bg-surface">
    <div className="grid min-h-[42rem] lg:grid-cols-2">
      {hasImage && imageSrc ? (
        <div
          className={cn(
            "relative min-h-[22rem] overflow-hidden lg:min-h-[34rem]",
            imagePosition === "left" ? "lg:order-1" : "lg:order-2",
          )}
        >
          <Image
            src={imageSrc}
            alt={content.image?.alt ?? content.title ?? "تصویر سیمرکو"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div
        className={cn(
          "flex items-center px-6 py-14 text-right",
          imagePosition === "left" ? "lg:order-2" : "lg:order-1",
        )}
      >
        <div className="mx-auto w-full max-w-xl">
          {content.eyebrow ? (
            <p className="mb-2 text-[11px] font-black tracking-[0.28em] text-primary">
              {content.eyebrow}
            </p>
          ) : null}

          {content.title ? (
             <h2 className="text-2xl font-semibold leading-[1.65] text-foreground md:text-[2rem]">
              {content.title}
            </h2>
          ) : null}

          {content.subtitle ? (
            <h4 className="mt-1 text-base font-semibold leading-8 text-foreground">
              {content.subtitle}
            </h4>
          ) : null}

          {content.paragraphs.length ? (
            <div className="mt-6 space-y-3 text-[0.95rem] font-medium leading-8 text-content text-justify">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          {content.button ? (
            <Link
              href={content.button.href}
              className="mt-8 inline-flex items-center gap-3 text-base font-bold text-secondary transition hover:text-primary"
            >
              {content.button.label}
              <ArrowLeft className="size-5" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  </section>
);
}