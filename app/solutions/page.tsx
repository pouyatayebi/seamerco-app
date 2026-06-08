import { ArchiveIntroSection } from "@/components/sections/archive-intro-section";
import { ExpandableCardGrid } from "@/components/shared/expandable-card-grid";
import { GuidesSection } from "@/components/sections/guides-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LineAdvisorSection } from "@/components/sections/line-advisor-section";
import { ProjectsShowcaseSection } from "@/components/sections/projects-showcase-section";
import { getSolutionsIndexItems } from "@/lib/content/get-solutions-index-items";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { getSiteSettings } from "@/lib/site/get-site-settings";
import { solutionsIndexSchema } from "@/lib/validations/content/solutions-index.schema";
import { guidesSectionSchema } from "@/lib/validations/content/sections/guides.schema";
import { lineAdvisorSectionSchema } from "@/lib/validations/content/sections/line-advisor.schema";
import { projectsShowcaseSectionSchema } from "@/lib/validations/content/sections/projects-showcase.schema";

export default async function SolutionsIndexPage() {
  const segments = ["solutions"];

  const [
    content,
    defaults,
    settings,
    items,
    guidesContent,
    projectsContent,
    advisorContent,
  ] = await Promise.all([
    readYamlContent(solutionsIndexSchema, "fa", segments),
    getSiteDefaults(),
    getSiteSettings(),
    getSolutionsIndexItems("fa"),
    readYamlContent(guidesSectionSchema, "fa", ["sections", "guides"]),
    readYamlContent(projectsShowcaseSectionSchema, "fa", [
      "sections",
      "projects-showcase",
    ]),
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
        variant="solutions"
        title={content.listing?.title ?? content.title}
        description={content.listing?.description ?? content.description}
        stats={[
          { label: "خط تولید", value: items.length },
          { label: "اجرای صفر تا صد", value: "EPC" },
        ]}
      />

      <section className="section bg-background pt-0">
        <div className="container-content">
          {items.length ? (
            <ExpandableCardGrid
              items={items}
              detailButtonLabel={
                content.listing?.detailButtonLabel ?? "مشاهده خط تولید"
              }
            />
          ) : (
            <div className="rounded-2xl border bg-surface p-10 text-center text-content-muted">
              {content.listing?.emptyMessage ??
                "هنوز خط تولیدی ثبت نشده است."}
            </div>
          )}
        </div>
      </section>

      <GuidesSection content={guidesContent} />

      <ProjectsShowcaseSection content={projectsContent} />

      <LineAdvisorSection
        content={advisorContent}
        whatsappHref={settings.contact.whatsapp.href}
      />
    </main>
  );
}