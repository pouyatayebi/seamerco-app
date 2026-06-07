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
import { readYamlContent } from "@/lib/content/read-yaml";
import { getPageMediaUrl } from "@/lib/media/media-url";
import type { ProjectPageContent } from "@/lib/validations/content/project.schema";
import { projectPageSchema } from "@/lib/validations/content/project.schema";
import type { ProjectsShowcaseSectionContent } from "@/lib/validations/content/sections/projects-showcase.schema";
import Image from "next/image";

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
    <section className="section bg-secondary text-white">
      <Container size="content">
        <div className="w-full text-right">
          {content.eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
              {content.eyebrow}
            </p>
          ) : null}

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            {content.title}
          </h2>

          {content.description || content.sideDescription ? (
            <p className="mt-3 max-w-none text-sm leading-8 text-white/78 md:text-[15px]">
              {content.description} {content.sideDescription}{" "}
              {content.allProjectsHref && content.allProjectsLabel ? (
                <Link
                  href={content.allProjectsHref}
                  className="inline-flex items-center gap-1 font-bold text-primary transition-colors duration-300 hover:text-white"
                >
                  {content.allProjectsLabel}
                  <ArrowLeft className="size-4" />
                </Link>
              ) : null}
            </p>
          ) : null}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-[box-shadow,border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_18px_42px_rgba(0,0,0,0.45)]"
            >
              <Link href={project.href} className="flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/20 to-transparent" />

                  {project.tag ? (
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                      <span className="inline-flex items-center gap-1">
                        <Factory className="size-3" />
                        {project.tag}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col px-4 py-4">
                  <h3 className="text-lg font-bold text-white">
                    {project.title}
                  </h3>

                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/85">
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
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/75">
                      {project.lineType}
                    </p>
                  ) : null}

                  <div className="mt-auto flex items-center justify-between pt-5 text-xs">
                    {project.capacity ? (
                      <span className="font-medium text-white/90">
                        {project.capacity}
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="inline-flex items-center gap-1 font-semibold text-primary">
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
