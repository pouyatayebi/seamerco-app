import { AboutPageSection } from "@/components/sections/about-page-section";
import { GuidesSection } from "@/components/sections/guides-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LineAdvisorSection } from "@/components/sections/line-advisor-section";
import { ProjectsShowcaseSection } from "@/components/sections/projects-showcase-section";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { getSiteSettings } from "@/lib/site/get-site-settings";
import { pageContentSchema } from "@/lib/validations/content/page.schema";
import { aboutPageSchema } from "@/lib/validations/content/sections/about-page.schema";
import { guidesSectionSchema } from "@/lib/validations/content/sections/guides.schema";
import { lineAdvisorSectionSchema } from "@/lib/validations/content/sections/line-advisor.schema";
import { projectsShowcaseSectionSchema } from "@/lib/validations/content/sections/projects-showcase.schema";

export default async function AboutUsPage() {
  const segments = ["about-us"];

  const [
    pageContent,
    defaults,
    settings,
    aboutContent,
    guidesContent,
    projectsContent,
    advisorContent,
  ] = await Promise.all([
    readYamlContent(pageContentSchema, "fa", segments),
    getSiteDefaults(),
    getSiteSettings(),
    readYamlContent(aboutPageSchema, "fa", segments),
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
        hero={pageContent.hero}
        defaults={defaults.hero}
        pageSegments={segments}
        variant="page"
      />

      <AboutPageSection content={aboutContent} mediaSegments={segments} />

      <GuidesSection content={guidesContent} />

      <ProjectsShowcaseSection content={projectsContent} />

      <LineAdvisorSection
        content={advisorContent}
        whatsappHref={settings.contact.whatsapp.href}
      />
    </main>
  );
}