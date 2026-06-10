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
    <section className="section relative overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgb(255_255_255/0.10),transparent_34rem),linear-gradient(180deg,var(--projects-section-start)_0%,var(--projects-section-middle)_50%,var(--projects-section-end)_100%)] text-white">
<ProjectsIndustrialPattern
  className="pointer-events-none absolute inset-0 h-full w-full text-white/18 [--pattern-accent:var(--primary)]"
  accentOpacity={0.82}
  shapeOpacity={0.16}
  lineOpacity={0.08}
  dotOpacity={0.16}
/>
      <Container size="content" className="relative z-10">
        <div className="mx-auto max-w-5xl text-right">
          {content.eyebrow ? (
            <p className="text-[11px] font-black uppercase tracking-[0.32em] text-primary">
              {content.eyebrow}
            </p>
          ) : null}

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {content.title}
          </h2>

          {content.description || content.sideDescription ? (
            <div className="mt-4 max-w-4xl">
              <p className="text-sm leading-8 text-white/78 md:text-[15px]">
                {content.description} {content.sideDescription}
              </p>

              {content.allProjectsHref && content.allProjectsLabel ? (
                <Link
                  href={content.allProjectsHref}
                  className="mt-2 inline-flex items-center gap-1 font-bold text-primary transition hover:text-white"
                >
                  {content.allProjectsLabel}
                  <ArrowLeft className="size-4" />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group overflow-hidden rounded-[1.6rem] border border-[var(--projects-card-border)] bg-[var(--projects-card-bg)] shadow-[0_18px_45px_rgb(0_0_0/0.32)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-[var(--projects-card-bg-hover)] hover:shadow-[0_26px_70px_rgb(0_0_0/0.42)]"
            >
              <Link href={project.href} className="flex h-full flex-col">
                <div className="relative aspect-[1.55/1] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover saturate-[0.82] transition duration-700 group-hover:scale-[1.04] group-hover:saturate-100"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/35 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

                  {project.tag ? (
                    <div className="absolute right-3 top-3 rounded-full border border-white/50 bg-white/92 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-secondary shadow-sm">
                      <span className="inline-flex items-center gap-1">
                        <Factory className="size-3 text-primary" />
                        {project.tag}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col px-4 py-4 text-right">
                  <h3 className="text-lg font-black leading-8 text-white">
                    {project.title}
                  </h3>

                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/82">
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
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/70">
                      {project.lineType}
                    </p>
                  ) : null}

                  <div className="mt-auto flex items-center justify-between pt-5 text-xs">
                    {project.capacity ? (
                      <span className="font-bold text-white/88">
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
      </Container>
    </section>
  );
}