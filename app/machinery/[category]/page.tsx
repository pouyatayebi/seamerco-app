import { notFound } from "next/navigation";

import { ExpandableCardGrid } from "@/components/shared/expandable-card-grid";
import { HeroSection } from "@/components/sections/hero-section";
import { GuidesSection } from "@/components/sections/guides-section";
import { ProjectsShowcaseSection } from "@/components/sections/projects-showcase-section";
import { LineAdvisorSection } from "@/components/sections/line-advisor-section";

import { getMachineryCategoryItems } from "@/lib/content/get-machinery-category-items";
import { readYamlContent } from "@/lib/content/read-yaml";

import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { getSiteSettings } from "@/lib/site/get-site-settings";

import {
  machineryCategorySchema,
} from "@/lib/validations/content/machinery-category.schema";

import { guidesSectionSchema } from "@/lib/validations/content/sections/guides.schema";
import { projectsShowcaseSectionSchema } from "@/lib/validations/content/sections/projects-showcase.schema";
import { lineAdvisorSectionSchema } from "@/lib/validations/content/sections/line-advisor.schema";

type PageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function MachineryCategoryPage({
  params,
}: PageProps) {
  const { category } = await params;

  const segments = ["machinery", category];

  let content;

  try {
    content = await readYamlContent(
      machineryCategorySchema,
      "fa",
      segments
    );
  } catch {
    notFound();
  }

  const [
    defaults,
    settings,
    items,
    guidesContent,
    projectsContent,
    advisorContent,
  ] = await Promise.all([
    getSiteDefaults(),
    getSiteSettings(),
    getMachineryCategoryItems("fa", category),

    readYamlContent(
      guidesSectionSchema,
      "fa",
      ["sections", "guides"]
    ),

    readYamlContent(
      projectsShowcaseSectionSchema,
      "fa",
      ["sections", "projects-showcase"]
    ),

    readYamlContent(
      lineAdvisorSectionSchema,
      "fa",
      ["sections", "line-advisor"]
    ),
  ]);

  return (
    <main>
      <HeroSection
        hero={content.hero}
        defaults={defaults.hero}
        pageSegments={segments}
        variant="page"
      />

      <section className="section bg-background">
        <div className="container-content">
          <div className="mb-10">
            <h2 className="section-title">
              {content.listing?.title ?? content.title}
            </h2>

            {(content.listing?.description ??
              content.description) ? (
              <p className="lead mt-6 max-w-4xl text-justify">
                {content.listing?.description ??
                  content.description}
              </p>
            ) : null}
          </div>

          {items.length > 0 ? (
            <ExpandableCardGrid
              items={items}
              detailButtonLabel="مشاهده دستگاه"
            />
          ) : (
            <div className="rounded-2xl border bg-surface p-10 text-center text-content-muted">
              {content.listing?.emptyMessage ??
                "هنوز دستگاهی برای این دسته ثبت نشده است."}
            </div>
          )}
        </div>
      </section>

      <GuidesSection content={guidesContent} />

      <ProjectsShowcaseSection
        content={projectsContent}
      />

      <LineAdvisorSection
        content={advisorContent}
        whatsappHref={
          settings.contact.whatsapp.href
        }
      />
    </main>
  );
}