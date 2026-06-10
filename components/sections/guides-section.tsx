import Image from "next/image";
import Link from "next/link";
import { MoveLeft, Play } from "lucide-react";

import { Container } from "@/components/shared/container";
import { GuidesIndustrialPattern } from "@/components/svg/patterns/guides-industrial-pattern";
import { getPageMediaUrl } from "@/lib/media/media-url";
import type { GuidesSectionContent } from "@/lib/validations/content/sections/guides.schema";

type GuidesSectionProps = {
  content: GuidesSectionContent;
  mediaSegments?: string[];
};

type GuideItem = GuidesSectionContent["items"][number];

export function GuidesSection({
  content,
  mediaSegments = ["sections", "guides"],
}: GuidesSectionProps) {
  const [factorySetup, manufacturing] = content.items;

  if (!factorySetup || !manufacturing) return null;

  return (
    <section className="section relative overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f7f9fb_48%,#ffffff_100%)]">
  <GuidesIndustrialPattern className="pointer-events-none absolute inset-0 h-full w-full text-secondary/30 [--pattern-accent:hsl(var(--primary))]" />

      <Container size="header" className="relative z-10">
        <div className="mx-auto grid max-w-[82rem] gap-5 lg:grid-cols-2">
          <GuideSplitCard item={manufacturing} mediaSegments={mediaSegments} />
          <GuideSplitCard item={factorySetup} mediaSegments={mediaSegments} />
        </div>
      </Container>
    </section>
  );
}

function GuideSplitCard({
  item,
  mediaSegments,
}: {
  item: GuideItem;
  mediaSegments: string[];
}) {
  const image = getPageMediaUrl(mediaSegments, item.image);
  const video = getPageMediaUrl(mediaSegments, item.video);

  return (
    <article className="grid overflow-hidden rounded-[1.45rem] border border-border/70 bg-white shadow-[0_14px_38px_rgba(0,0,0,0.065)] transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_56px_rgba(0,0,0,0.10)] md:grid-cols-[1.08fr_0.92fr]">
      <div className="flex min-h-[22rem] flex-col justify-center p-6 text-left md:p-7">
        <p className="text-xs font-bold tracking-[0.16em] text-primary">
          {item.titleTop}
        </p>

        <h3 className="mt-2 text-xl font-black leading-[1.55] text-secondary md:text-2xl">
          {item.titleBottom}
        </h3>

        <p className="mt-4 text-sm leading-7 text-content-muted">
          {item.description}
        </p>

        <Link
          href={item.href}
          className="mt-6 inline-flex self-end w-fit items-center gap-3 rounded-full border border-secondary/20 bg-white px-5 py-2.5 text-secondary shadow-sm transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
        >
          <span className="flex flex-col text-left leading-5">
            <span className="text-xs font-black">{item.buttonTextTop}</span>
            <span className="text-[0.68rem] font-semibold opacity-65">
              {item.buttonTextBottom}
            </span>
          </span>

          <MoveLeft className="size-4 shrink-0" />
        </Link>
      </div>

      <div className="relative min-h-[18rem] overflow-hidden bg-muted md:min-h-full">
        <Image
          src={image}
          alt={`${item.titleTop} ${item.titleBottom}`}
          fill
          sizes="(max-width: 768px) 100vw, 30vw"
          className="object-cover transition duration-700 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-secondary/45 via-transparent to-transparent" />

        <a
          href={video}
          target="_blank"
          rel="noreferrer"
          aria-label={`مشاهده ویدئو ${item.titleTop} ${item.titleBottom}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-white/92 text-primary shadow-lg ring-8 ring-white/20 transition hover:scale-110">
            <Play className="size-5 fill-current" />
          </span>
        </a>
      </div>
    </article>
  );
}