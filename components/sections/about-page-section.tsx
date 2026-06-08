import {
  Award,
  DraftingCompass,
  Factory,
  Globe2,
  Settings2,
  ShieldCheck,
  UsersRound,
  Wrench,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { VideoLightbox } from "@/components/shared/video-lightbox";
import { getPageMediaUrl } from "@/lib/media/media-url";
import type { AboutPageContent } from "@/lib/validations/content/sections/about-page.schema";

type AboutPageSectionProps = {
  content: AboutPageContent;
  mediaSegments: string[];
};

const statIcons = [Factory, Settings2, Award, Globe2];

const capabilityIcons = [
  DraftingCompass,
  Wrench,
  Factory,
  UsersRound,
  ShieldCheck,
  Settings2,
];

export function AboutPageSection({
  content,
  mediaSegments,
}: AboutPageSectionProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-background py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(216,74,43,0.09),transparent_24rem),radial-gradient(circle_at_90%_10%,rgba(0,59,112,0.10),transparent_28rem)]" />

        <Container size="content" className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="relative overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(216,74,43,0.22),transparent_20rem),linear-gradient(135deg,#06182a,#003b70_55%,#03101f)] p-6 text-white shadow-[0_30px_90px_rgba(0,0,0,0.28)] md:p-8">
              <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-white/40 to-transparent" />

              {content.story.eyebrow ? (
                <p className="text-xs font-bold tracking-[0.28em] text-primary">
                  {content.story.eyebrow}
                </p>
              ) : null}

              <h2 className="mt-4 max-w-2xl text-2xl font-black leading-[1.75] text-white md:text-[2.15rem]">
                {content.story.title}
              </h2>

              <p className="mt-5 max-w-2xl text-justify text-sm leading-8 text-white/78">
                {content.story.lead}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {content.story.stats.map((stat, index) => {
                  const Icon = statIcons[index] ?? Factory;

                  return (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur"
                    >
                      <Icon className="size-5 text-primary" />

                      <p className="mt-3 text-2xl font-black text-white">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-xs text-white/68">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="rounded-[2rem] border bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)] md:p-7">
                <div className="space-y-4 text-justify text-[0.92rem] leading-8 text-content-muted">
                  {content.story.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-secondary text-white">
        <Container size="content">
          <div className="mb-9 max-w-3xl">
            {content.capabilities.eyebrow ? (
              <p className="eyebrow">{content.capabilities.eyebrow}</p>
            ) : null}

            <h2 className="mt-3 text-white">{content.capabilities.title}</h2>

            <p className="mt-5 text-justify text-sm leading-8 text-white/72">
              {content.capabilities.description}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.capabilities.items.map((item, index) => {
              const Icon = capabilityIcons[index] ?? Settings2;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.09]"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="size-5" />
                  </span>

                  <h3 className="mt-4 text-base font-black text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-justify text-sm leading-7 text-white/68">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section bg-background">
        <Container size="content">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="rounded-[1.75rem] border bg-surface p-5">
              <h2 className="section-title">{content.timeline.title}</h2>

              <div className="mt-8 space-y-5">
                {content.timeline.items.map((item) => (
                  <div
                    key={item.year}
                    className="relative border-r border-primary/30 pr-6"
                  >
                    <span className="absolute -right-[0.38rem] top-1.5 size-3 rounded-full bg-primary shadow-[0_0_0_5px_rgba(216,74,43,0.14)]" />

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">
                        {item.year}
                      </span>

                      <h3 className="text-base font-black text-foreground">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-justify text-sm leading-7 text-content-muted">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="section-title">{content.media.title}</h2>

              {content.media.description ? (
                <p className="lead mt-6 text-justify">
                  {content.media.description}
                </p>
              ) : null}

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {content.media.items.map((item) => (
                  <div key={item.title} className="space-y-4">
                    <VideoLightbox
                      image={getPageMediaUrl(mediaSegments, item.image)}
                      video={getPageMediaUrl(mediaSegments, item.video)}
                      alt={item.title}
                      playSize="md"
                      className="aspect-[1.2/1] rounded-2xl shadow-md"
                    />

                    <div className="text-right">
                      <h3 className="text-base font-black text-foreground">
                        {item.title}
                      </h3>

                      {item.description ? (
                        <p className="mt-2 text-justify text-sm leading-7 text-content-muted">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}