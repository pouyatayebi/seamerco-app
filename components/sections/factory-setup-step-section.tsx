import Image from "next/image";
import {
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  Layers3,
  PackageCheck,
  Route,
  Settings2,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { getPageMediaUrl } from "@/lib/media/media-url";
import type { FactorySetupStepContent } from "@/lib/validations/content/factory-setup-step.schema";
import { VideoLightbox } from "@/components/shared/video-lightbox";

type FactorySetupStepSectionProps = {
  content: FactorySetupStepContent;
  mediaSegments: string[];
};

const processIcons = [
  Route,
  Settings2,
  Layers3,
  Gauge,
  FileText,
  ClipboardCheck,
];

export function FactorySetupStepSection({
  content,
  mediaSegments,
}: FactorySetupStepSectionProps) {
  const coverImage = content.cover ?? content.featuredImage;
  const videoPoster = content.cover ?? content.featuredImage ?? content.hero?.poster;

  return (
    <>
      {content.summary ? (
        <section className="relative overflow-hidden bg-background py-14 md:py-18">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(216,74,43,0.08),transparent_24rem),radial-gradient(circle_at_88%_8%,rgba(0,59,112,0.10),transparent_28rem)]" />

          <Container size="content" className="relative">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
              <div className="relative flex min-h-full flex-col overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(216,74,43,0.22),transparent_20rem),linear-gradient(135deg,#06182a,#003b70_55%,#03101f)] p-6 text-white shadow-[0_30px_90px_rgba(0,0,0,0.25)] md:p-8">
                <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-white/35 to-transparent" />

                {content.summary.eyebrow ? (
                  <p className="text-xs font-bold tracking-[0.28em] text-primary">
                    {content.summary.eyebrow}
                  </p>
                ) : null}

                <h2 className="mt-4 text-2xl font-black leading-[1.75] text-white md:text-3xl">
                  {content.summary.title}
                </h2>

                <p className="mt-5 text-justify text-sm leading-8 text-white/75">
                  {content.summary.description}
                </p>

                {content.summary.highlights.length ? (
                  <div className="mt-7 grid gap-3">
                    {content.summary.highlights.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm leading-7 text-white/75"
                      >
                        <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-2">
                  {content.duration ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                      <p className="text-xs text-white/55">مدت تقریبی</p>
                      <p className="mt-2 text-sm font-black leading-7 text-white">
                        {content.duration}
                      </p>
                    </div>
                  ) : null}

                  {content.output ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                      <p className="text-xs text-white/55">خروجی مرحله</p>
                      <p className="mt-2 line-clamp-2 text-sm font-black leading-7 text-white">
                        {content.output}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-5">
           
{content.video && videoPoster ? (
  <VideoLightbox
    image={getPageMediaUrl(mediaSegments, videoPoster)}
    video={getPageMediaUrl(mediaSegments, content.video)}
    alt={`ویدئوی ${content.title}`}
    title={`ویدئوی ${content.title}`}
    playSize="sm"
    className="aspect-video rounded-[2rem] border shadow-sm"
  />
) : null}
                {content.summary.paragraphs.length ? (
                  <div className="rounded-[2rem] border bg-white p-5 shadow-sm md:p-7">
                    <div className="space-y-4 text-justify text-[0.92rem] leading-8 text-content-muted">
                      {content.summary.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {content.process?.items.length ? (
        <section className="section bg-surface">
          <Container size="content">
            <div className="mb-8 max-w-3xl">
              <h2 className="section-title">{content.process.title}</h2>

              {content.process.description ? (
                <p className="lead mt-6 text-justify">
                  {content.process.description}
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {content.process.items.map((item, index) => {
                const Icon = processIcons[index] ?? Settings2;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>

                    <h3 className="mt-4 text-base font-black text-foreground">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-justify text-sm leading-7 text-content-muted">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      {content.deliverables?.items.length ? (
        <section className="section bg-background">
          <Container size="content">
            <div className="overflow-hidden rounded-[2rem] border bg-[linear-gradient(135deg,#f8fafc,#ffffff)] p-6 shadow-sm md:p-8">
              <div className="mb-8 flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <PackageCheck className="size-6" />
                </span>

                <h2 className="section-title">
                  {content.deliverables.title}
                </h2>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {content.deliverables.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border bg-white p-4"
                  >
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
                    <p className="text-sm leading-7 text-content-muted">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {content.gallery?.items.length ? (
        <section className="section bg-surface">
          <Container size="content">
            <div className="mb-8 max-w-3xl">
              <h2 className="section-title">{content.gallery.title}</h2>

              {content.gallery.description ? (
                <p className="lead mt-6 text-justify">
                  {content.gallery.description}
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {content.gallery.items.map((item, index) => (
                <div
                  key={`${item.image}-${index}`}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted shadow-sm"
                >
                  <Image
                    src={getPageMediaUrl(mediaSegments, item.image)}
                    alt={item.alt ?? content.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}