import Link from "next/link";
import { MoveLeft } from "lucide-react";

import { Container } from "@/components/shared/container";
import { VideoLightbox } from "@/components/shared/video-lightbox";
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
    <section className="section bg-background">
      <Container size="content">
        <div className="grid gap-10 lg:grid-cols-[25rem_1fr] xl:grid-cols-[27rem_1fr] lg:items-start [direction:ltr]">
          <div className="hidden [direction:rtl] lg:block">
            <VideoLightbox
              image={mainImage}
              video={mainVideo}
              alt={content.media.main.alt}
              playSize="sm"
              className="h-[30rem] w-full rounded-[1.6rem] shadow-[0_18px_45px_rgba(0,0,0,0.10)]"
              imageClassName="rounded-[1.6rem]"
              overlayClassName="bg-secondary/10 group-hover:bg-secondary/22"
            />
          </div>

          <div className="[direction:rtl]">
            <div className="max-w-4xl text-right">
              {content.eyebrow ? (
                <p className="mb-2 text-xs font-black tracking-[0.22em] text-primary">
                  {content.eyebrow}
                </p>
              ) : null}

              <h2 className="text-2xl font-black leading-[1.6] text-foreground md:text-[1.9rem]">
                {content.title}
              </h2>

              <div className="mt-1 text-justify text-[0.92rem] leading-[2.35] text-content-muted">
                <p>
                  <strong className="font-black text-foreground">
                    {content.introStrong}
                  </strong>{" "}
                  {content.paragraphs[0]}
                </p>

                {content.paragraphs.slice(1, 5).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                <Link
                  href={content.readMore.href}
                  className="inline-flex items-center gap-2 pt-1 text-sm font-bold text-primary transition hover:-translate-x-1"
                >
                  {content.readMore.label}
                  <MoveLeft className="size-5 stroke-[3]" />
                </Link>
              </div>
            </div>

            <div className="mt-3 hidden max-w-[25rem] grid-cols-3 gap-2 lg:grid">
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

            <div className="mt-7 space-y-4 lg:hidden">
              <VideoLightbox
                image={mainImage}
                video={mainVideo}
                alt={content.media.main.alt}
                playSize="sm"
                className="h-[21rem] w-full rounded-[1.5rem] shadow-md md:h-[25rem]"
                imageClassName="rounded-[1.5rem]"
              />

              <div className="grid grid-cols-3 gap-2">
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
          </div>
        </div>
      </Container>
    </section>
  );
}