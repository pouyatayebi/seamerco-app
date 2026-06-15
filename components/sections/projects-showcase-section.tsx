import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  Factory,
  Globe2,
  MapPin,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import { ProjectsIndustrialPattern } from "@/components/svg/patterns/projects-industrial-pattern";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getPageMediaUrl } from "@/lib/media/media-url";
import type { ProjectPageContent } from "@/lib/validations/content/project.schema";
import { projectPageSchema } from "@/lib/validations/content/project.schema";
import type { ProjectsShowcaseSectionContent } from "@/lib/validations/content/sections/projects-showcase.schema";

type ResolvedProject = ProjectPageContent & {
  slug: string;
  href: string;
  image: string;
};

async function getProject(slug: string): Promise<ResolvedProject> {
  const segments = ["projects", slug];
  const project = await readYamlContent(projectPageSchema, "fa", segments);

  const imageFile = project.featuredImage ?? project.hero?.poster ?? "card.jpg";

  return {
    ...project,
    slug,
    href: `/projects/${slug}`,
    image: getPageMediaUrl(segments, imageFile),
  };
}

type ProjectsShowcaseSectionProps = {
  content: ProjectsShowcaseSectionContent;
};

export async function ProjectsShowcaseSection({
  content,
}: ProjectsShowcaseSectionProps) {
  const projects = await Promise.all(content.items.map(getProject));

  if (!projects.length) return null;

  return (
    <section className="section relative overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgb(255_255_255/0.20),transparent_34rem),radial-gradient(circle_at_16%_42%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_28rem),linear-gradient(180deg,color-mix(in_srgb,var(--secondary)_82%,white)_0%,var(--secondary)_48%,color-mix(in_srgb,var(--secondary)_82%,black)_100%)] text-white">
      <ProjectsIndustrialPattern
        className="pointer-events-none absolute inset-0 hidden h-full w-full text-white/13 [--pattern-accent:var(--primary)] lg:block"
        accentOpacity={0.42}
        shapeOpacity={0.1}
        lineOpacity={0.05}
        dotOpacity={0.06}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.08)_0%,transparent_18%,transparent_82%,rgb(255_255_255/0.08)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-white/22 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-white/12 to-transparent" />

      <Container size="content" className="relative z-10">
        <div className="rounded-[2rem] border border-white/12 bg-white/[0.055] p-5 text-right shadow-[0_24px_80px_rgb(0_0_0/0.16)] backdrop-blur-md md:p-7">
          {content.eyebrow ? (
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-primary">
              {content.eyebrow}
            </p>
          ) : null}

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {content.title}
          </h2>

          {content.description || content.sideDescription ? (
            <div className="mt-4">
              <p className="text-justify text-sm leading-8 text-white/84 md:text-[15px]">
                {content.description} {content.sideDescription}
              </p>

              {content.allProjectsHref && content.allProjectsLabel ? (
                <Link
                  href={content.allProjectsHref}
                  className="mt-3 inline-flex items-center gap-1 font-bold text-primary transition hover:text-white"
                >
                  {content.allProjectsLabel}
                  <ArrowLeft className="size-4" />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-7 rounded-[2rem] border border-white/10 bg-white/[0.045] p-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_28px_90px_rgb(0_0_0/0.20)] backdrop-blur-sm md:p-4">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="group overflow-hidden rounded-[1.55rem] border border-white/24 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--secondary)_88%,white)_0%,color-mix(in_srgb,var(--secondary)_95%,black)_100%)] shadow-[0_20px_65px_rgb(0_0_0/0.32)] ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:border-primary/55 hover:shadow-[0_30px_90px_rgb(0_0_0/0.44)]"
              >
                <Link href={project.href} className="flex h-full flex-col">
                  <div className="relative aspect-[1.55/1] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover saturate-[0.88] transition duration-700 group-hover:scale-[1.04] group-hover:saturate-100"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/88 via-secondary/34 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-secondary/20" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[rgb(4_29_56/0.68)] to-transparent" />

                    {project.tag ? (
                      <div className="absolute right-3 top-3 rounded-full border border-white/60 bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-secondary shadow-sm">
                        <span className="inline-flex items-center gap-1">
                          <Factory className="size-3 text-primary" />
                          {project.tag}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col bg-[linear-gradient(180deg,color-mix(in_srgb,var(--secondary)_90%,white)_0%,color-mix(in_srgb,var(--secondary)_90%,black)_100%)] px-4 py-4 text-right">
                    <h3 className="text-lg font-black leading-8 text-white">
                      {project.title}
                    </h3>

                    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/88">
                      {project.location ? (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="size-3.5 text-primary" />
                          <span>{project.location}</span>
                        </div>
                      ) : null}

                      {project.country ? (
                        <div className="flex items-center gap-1.5">
                          <Globe2 className="size-3.5 text-primary" />
                          <span>{project.country}</span>
                        </div>
                      ) : null}

                      {project.year ? (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="size-3.5 text-primary" />
                          <span>{project.year}</span>
                        </div>
                      ) : null}

                      {project.duration ? (
                        <div className="flex items-center gap-1.5">
                          <Clock3 className="size-3.5 text-primary" />
                          <span>{project.duration}</span>
                        </div>
                      ) : null}
                    </div>

                    {project.lineType ? (
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/74">
                        {project.lineType}
                      </p>
                    ) : null}

                    <div className="mt-auto flex items-center justify-between pt-5 text-xs">
                      {project.capacity ? (
                        <span className="font-bold text-white/92">
                          {project.capacity}
                        </span>
                      ) : (
                        <span />
                      )}

                      <span className="inline-flex items-center gap-1 font-black text-primary transition group-hover:text-white">
                        {content.detailsLabel}
                        <ArrowLeft className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}