import Link from "next/link";
import { MoveLeft } from "lucide-react";

import { Container } from "@/components/shared/container";
import { VideoLightbox } from "@/components/shared/video-lightbox";
import { getPageMediaUrl } from "@/lib/media/media-url";
import type { AboutSectionContent } from "@/lib/validations/content/sections/about.schema";

type AboutSectionProps = {
  content: AboutSectionContent;
  mediaSegments?: string[];
};

export function AboutSection({
  content,
  mediaSegments = ["sections", "about"],
}: AboutSectionProps) {
  const mainImage = getPageMediaUrl(mediaSegments, content.media.main.image);
  const mainVideo = getPageMediaUrl(mediaSegments, content.media.main.video);

  return (
    <section className="section">
      <Container size="content">
        <div className="lg:grid lg:h-[29rem] lg:grid-cols-[28rem_1fr] lg:items-stretch lg:gap-8 [direction:ltr]">
          <div className="hidden [direction:rtl] lg:block">
            <VideoLightbox
              image={mainImage}
              video={mainVideo}
              alt={content.media.main.alt}
              playSize="md"
              className="h-full w-full rounded-2xl shadow-md"
            />
          </div>

          <div className="[direction:rtl]">
            <div className="flex h-full w-full flex-col text-right">
              <h2 className="text-2xl font-black text-foreground md:text-[1.7rem]">
                {content.title}
              </h2>

              <div className="mt-4 text-justify text-sm leading-7 text-muted-foreground">
                <p>
                  <strong className="font-black text-foreground">
                    {content.introStrong}
                  </strong>{" "}
                  {content.paragraphs[0]}
                </p>

                <p className="mt-3">
                  {content.paragraphs[1]}
                  <br />
                  <span>{content.paragraphs[2]}</span>
                  <span className="mx-1 text-muted-foreground/60">...</span>

                  <Link
                    href={content.readMore.href}
                    aria-label={content.readMore.label}
                    className="inline-flex align-middle text-primary hover:text-primary/80"
                  >
                    <MoveLeft className="inline-block size-6 align-middle stroke-[3.4]" />
                  </Link>
                </p>
              </div>

              <div className="mt-6 space-y-4 lg:hidden">
                <VideoLightbox
                  image={mainImage}
                  video={mainVideo}
                  alt={content.media.main.alt}
                  playSize="sm"
                  className="h-[22rem] w-full rounded-2xl shadow-md md:h-[27rem]"
                />

                <div className="grid grid-cols-3 gap-3">
                  {content.media.items.map((item) => (
                    <VideoLightbox
                      key={item.video}
                      image={getPageMediaUrl(mediaSegments, item.image)}
                      video={getPageMediaUrl(mediaSegments, item.video)}
                      alt={item.alt}
                      playSize="sm"
                      className="aspect-[0.82/1] rounded-xl shadow-sm"
                      imageClassName="rounded-xl"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-auto hidden grid-cols-3 gap-3 lg:grid">
                {content.media.items.map((item) => (
                  <VideoLightbox
                    key={item.video}
                    image={getPageMediaUrl(mediaSegments, item.image)}
                    video={getPageMediaUrl(mediaSegments, item.video)}
                    alt={item.alt}
                    playSize="sm"
                    className="aspect-[0.82/1] rounded-xl shadow-sm"
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