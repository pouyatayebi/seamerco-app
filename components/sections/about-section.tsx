import Link from "next/link";
import { MoveLeft } from "lucide-react";

import { Container } from "@/components/shared/container";
import { VideoLightbox } from "@/components/shared/video-lightbox";
import { AboutIndustrialPattern } from "@/components/svg/patterns/about-industrial-pattern";
import { getPageMediaUrl } from "@/lib/media/media-url";
import type { AboutSectionContent } from "@/lib/validations/content/sections/about.schema";

type AboutSectionProps = {
  content: AboutSectionContent & {
    eyebrow?: string;
  };
  mediaSegments?: string[];
};

export function AboutSection({
  content,
  mediaSegments = ["sections", "about"],
}: AboutSectionProps) {
  const mainImage = getPageMediaUrl(mediaSegments, content.media.main.image);
  const mainVideo = getPageMediaUrl(mediaSegments, content.media.main.video);

  return (
    <section className="section relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_52%,#ffffff_100%)]">
      <AboutIndustrialPattern className="hidden lg:block pointer-events-none absolute inset-0 h-full w-full text-secondary/35 [--pattern-accent:hsl(var(--primary))]" />

      <Container size="content">
        <div className="relative z-10 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch [direction:ltr]">
          <div className="rounded-[2rem] border bg-white/85 p-3 shadow-[0_20px_55px_rgba(0,0,0,0.08)] backdrop-blur-sm [direction:rtl]">
            <VideoLightbox
              image={mainImage}
              video={mainVideo}
              alt={content.media.main.alt}
              playSize="sm"
              className="h-[24rem] w-full rounded-[1.6rem] md:h-[28rem] lg:h-full"
              imageClassName="rounded-[1.6rem]"
              overlayClassName="bg-secondary/10 group-hover:bg-secondary/22"
            />
          </div>

          <div className="flex flex-col rounded-[2rem] border bg-white/90 p-6 text-right shadow-[0_20px_55px_rgba(0,0,0,0.07)] backdrop-blur-sm md:p-8 [direction:rtl]">
            {content.eyebrow ? (
              <p className="mb-2 text-[11px] font-black tracking-[0.28em] text-primary">
                {content.eyebrow}
              </p>
            ) : null}

            <h2 className="text-2xl font-semibold leading-[1.65] text-foreground md:text-[2rem]">
              {content.title}
            </h2>

            <div className="mt-4 text-justify text-[0.92rem] leading-[2.25] text-content-muted">
              <p>
                <strong className="font-semibold text-foreground">
                  {content.introStrong}
                </strong>{" "}
                {content.paragraphs[0]}
              </p>

              {content.paragraphs.slice(1, 4).map((paragraph) => (
                <p key={paragraph} className="mt-2">
                  {paragraph}
                </p>
              ))}
            </div>

            <Link
              href={content.readMore.href}
              className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition hover:-translate-x-1"
            >
              {content.readMore.label}
              <MoveLeft className="size-5 stroke-[2]" />
            </Link>

            <div className="mt-auto hidden pt-5 lg:block">
              <div className="grid max-w-[20rem] grid-cols-3 gap-2">
                {content.media.items.map((item) => (
                  <VideoLightbox
                    key={item.video}
                    image={getPageMediaUrl(mediaSegments, item.image)}
                    video={getPageMediaUrl(mediaSegments, item.video)}
                    alt={item.alt}
                    playSize="sm"
                    className="aspect-[1.35/1] rounded-xl shadow-[0_7px_16px_rgba(0,0,0,0.08)]"
                    imageClassName="rounded-xl"
                    overlayClassName="bg-secondary/5 group-hover:bg-secondary/18"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 lg:hidden [direction:rtl]">
            {content.media.items.map((item) => (
              <VideoLightbox
                key={item.video}
                image={getPageMediaUrl(mediaSegments, item.image)}
                video={getPageMediaUrl(mediaSegments, item.video)}
                alt={item.alt}
                playSize="sm"
                className="aspect-[1.15/1] rounded-xl"
                imageClassName="rounded-xl"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}