import Image from "next/image";
import {
  CheckCircle2,
  ClipboardCheck,
  Factory,
  Gauge,
  MapPin,
  PackageCheck,
  Settings2,
  Wrench,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { getPageMediaUrl } from "@/lib/media/media-url";
import type { ProjectPageContent } from "@/lib/validations/content/project-page.schema";

type ProjectPageSectionProps = {
  content: ProjectPageContent;
  mediaSegments: string[];
};

const scopeIcons = [Factory, Settings2, Wrench, Gauge, PackageCheck, ClipboardCheck];

export function ProjectPageSection({
  content,
  mediaSegments,
}: ProjectPageSectionProps) {
  return (
    <>
      <section className="section bg-background">
        <Container size="content">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="relative overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(216,74,43,0.22),transparent_20rem),linear-gradient(135deg,#06182a,#003b70_55%,#03101f)] p-6 text-white shadow-[0_30px_90px_rgba(0,0,0,0.25)] md:p-8">
              {content.overview.eyebrow ? (
                <p className="text-xs font-bold tracking-[0.28em] text-primary">
                  {content.overview.eyebrow}
                </p>
              ) : null}

              <h2 className="mt-4 text-2xl font-black leading-[1.7] text-white md:text-3xl">
                {content.overview.title}
              </h2>

              <p className="mt-5 text-justify text-sm leading-8 text-white/75">
                {content.overview.lead}
              </p>

              {content.overview.facts.length ? (
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {content.overview.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.07] p-4"
                    >
                      <p className="text-xs text-white/55">{fact.label}</p>
                      <p className="mt-2 text-sm font-black leading-7 text-white">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="rounded-[2rem] border bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)] md:p-7">
              <div className="space-y-4 text-justify text-[0.92rem] leading-8 text-content-muted">
                {content.overview.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-surface">
        <Container size="content">
          <div className="mb-8 max-w-3xl">
            <h2 className="section-title">{content.scope.title}</h2>

            {content.scope.description ? (
              <p className="lead mt-6 text-justify">
                {content.scope.description}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.scope.items.map((item, index) => {
              const Icon = scopeIcons[index] ?? CheckCircle2;

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

      {content.results ? (
        <section className="section bg-background">
          <Container size="content">
            <div className="rounded-[2rem] border bg-[linear-gradient(135deg,#f8fafc,#ffffff)] p-6 shadow-sm md:p-8">
              <h2 className="section-title">{content.results.title}</h2>

              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {content.results.items.map((item) => (
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