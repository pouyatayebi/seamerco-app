import { ArchiveIntroSection } from "@/components/sections/archive-intro-section";
import { ExpandableCardGrid } from "@/components/shared/expandable-card-grid";
import { GuidesSection } from "@/components/sections/guides-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LineAdvisorSection } from "@/components/sections/line-advisor-section";

import { getProjectsIndexItems } from "@/lib/content/get-projects-index-items";
import { readYamlContent } from "@/lib/content/read-yaml";

import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { getSiteSettings } from "@/lib/site/get-site-settings";

import { projectsIndexSchema } from "@/lib/validations/content/projects-index.schema";
import { guidesSectionSchema } from "@/lib/validations/content/sections/guides.schema";
import { lineAdvisorSectionSchema } from "@/lib/validations/content/sections/line-advisor.schema";

export default async function ProjectsIndexPage() {
  const segments = ["projects"];

  const [
    content,
    defaults,
    settings,
    items,
    guidesContent,
    advisorContent,
  ] = await Promise.all([
    readYamlContent(projectsIndexSchema, "fa", segments),
    getSiteDefaults(),
    getSiteSettings(),
    getProjectsIndexItems("fa"),
    readYamlContent(guidesSectionSchema, "fa", ["sections", "guides"]),
    readYamlContent(lineAdvisorSectionSchema, "fa", [
      "sections",
      "line-advisor",
    ]),
  ]);

  return (
    <main>
      <HeroSection
        hero={content.hero}
        defaults={defaults.hero}
        pageSegments={segments}
        variant="page"
      />

      <ArchiveIntroSection
        variant="projects"
        title={content.listing?.title ?? content.title}
        description={content.listing?.description ?? content.description}
        stats={[
          {
            label: "پروژه اجراشده",
            value: items.length,
          },
          {
            label: "حوزه فعالیت",
            value: "صنایع غذایی",
          },
        ]}
      />

      <section className="section bg-background pt-0">
        <div className="container-content">
          {items.length ? (
            <ExpandableCardGrid
              items={items}
              detailButtonLabel={
                content.listing?.detailButtonLabel ?? "مشاهده پروژه"
              }
            />
          ) : (
            <div className="rounded-2xl border bg-surface p-10 text-center text-content-muted">
              {content.listing?.emptyMessage ??
                "هنوز پروژه‌ای ثبت نشده است."}
            </div>
          )}
        </div>
      </section>

      <GuidesSection content={guidesContent} />

      <LineAdvisorSection
        content={advisorContent}
        whatsappHref={settings.contact.whatsapp.href}
      />
    </main>
  );
}