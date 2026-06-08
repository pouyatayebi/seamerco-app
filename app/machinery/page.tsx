import { ArchiveIntroSection } from "@/components/sections/archive-intro-section";
import { MachineryFilteredGrid } from "@/components/sections/machinery-filtered-grid";
import { HeroSection } from "@/components/sections/hero-section";
import { GuidesSection } from "@/components/sections/guides-section";
import { ProjectsShowcaseSection } from "@/components/sections/projects-showcase-section";
import { LineAdvisorSection } from "@/components/sections/line-advisor-section";

import { getMachineryIndexData } from "@/lib/content/get-machinery-index";
import { readYamlContent } from "@/lib/content/read-yaml";

import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { getSiteSettings } from "@/lib/site/get-site-settings";

import { machineryIndexSchema } from "@/lib/validations/content/machinery-index.schema";
import { guidesSectionSchema } from "@/lib/validations/content/sections/guides.schema";
import { lineAdvisorSectionSchema } from "@/lib/validations/content/sections/line-advisor.schema";
import { projectsShowcaseSectionSchema } from "@/lib/validations/content/sections/projects-showcase.schema";

export default async function MachineryIndexPage() {
  const segments = ["machinery"];

  const [
    content,
    defaults,
    settings,
    machinery,
    guidesContent,
    projectsContent,
    advisorContent,
  ] = await Promise.all([
    readYamlContent(machineryIndexSchema, "fa", segments),
    getSiteDefaults(),
    getSiteSettings(),
    getMachineryIndexData("fa"),
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
        variant="machinery"
        title={content.title}
        description={content.description}
        stats={[
          {
            label: "دسته ماشین‌آلات",
            value: machinery.categories.length,
          },
          {
            label: "ماشین ثبت‌شده",
            value: machinery.products.length,
          },
        ]}
      />

      <section className="section bg-background pt-0">
        <div className="container-content">
          <MachineryFilteredGrid
            categories={machinery.categories}
            products={machinery.products}
            solutions={content.filters?.solutions ?? []}
            labels={{
              allLabel:
                content.filters?.allLabel ?? "همه ماشین‌آلات",

              categoryLabel:
                content.filters?.categoryLabel ??
                "نوع ماشین‌آلات",

              solutionLabel:
                content.filters?.solutionLabel ??
                "خط تولید",

              allSolutionsLabel:
                content.filters?.allSolutionsLabel ??
                "همه خطوط تولید",
            }}
          />
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