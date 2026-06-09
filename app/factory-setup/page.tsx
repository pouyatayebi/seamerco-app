import { ArchiveIntroSection } from "@/components/sections/archive-intro-section";
import { FactorySetupRoadmapSection } from "@/components/sections/factory-setup-roadmap-section";
import { GuidesSection } from "@/components/sections/guides-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LineAdvisorSection } from "@/components/sections/line-advisor-section";
import { ProjectsShowcaseSection } from "@/components/sections/projects-showcase-section";
import { getFactorySetupSteps } from "@/lib/content/get-factory-setup-steps";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { getSiteSettings } from "@/lib/site/get-site-settings";
import { factorySetupIndexSchema } from "@/lib/validations/content/factory-setup-index.schema";
import { guidesSectionSchema } from "@/lib/validations/content/sections/guides.schema";
import { lineAdvisorSectionSchema } from "@/lib/validations/content/sections/line-advisor.schema";
import { projectsShowcaseSectionSchema } from "@/lib/validations/content/sections/projects-showcase.schema";

export default async function FactorySetupPage() {
  const segments = ["factory-setup"];

  const [content, defaults, settings, guidesContent, projectsContent, advisorContent] =
    await Promise.all([
      readYamlContent(factorySetupIndexSchema, "fa", segments),
      getSiteDefaults(),
      getSiteSettings(),
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

  const steps = await getFactorySetupSteps("fa", content.roadmap.steps);

  return (
    <main>
      <HeroSection
        hero={content.hero}
        defaults={defaults.hero}
        pageSegments={segments}
        variant="page"
      />

      {content.intro ? (
        <ArchiveIntroSection
          variant="solutions"
          eyebrow={content.intro.eyebrow}
          title={content.intro.title}
          description={content.intro.description}
          stats={[
            { label: "مرحله اصلی", value: steps.length },
            { label: "مدل اجرا", value: "صفر تا صد" },
          ]}
        />
      ) : null}

      <FactorySetupRoadmapSection
        title={content.roadmap.title}
        description={content.roadmap.description}
        detailButtonLabel={content.roadmap.detailButtonLabel}
        steps={steps}
      />

      <GuidesSection content={guidesContent} />

      <ProjectsShowcaseSection content={projectsContent} />

      <LineAdvisorSection
        content={advisorContent}
        whatsappHref={settings.contact.whatsapp.href}
      />
    </main>
  );
}