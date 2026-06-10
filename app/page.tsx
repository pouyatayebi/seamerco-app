import { AboutSection } from "@/components/sections/about-section";
import { ContentCardGridSection } from "@/components/sections/content-card-grid-section";
import { GuidesSection } from "@/components/sections/guides-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsShowcaseSection } from "@/components/sections/projects-showcase-section";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { pageContentSchema } from "@/lib/validations/content/page.schema";
import { aboutSectionSchema } from "@/lib/validations/content/sections/about.schema";
import { guidesSectionSchema } from "@/lib/validations/content/sections/guides.schema";
import { projectsShowcaseSectionSchema } from "@/lib/validations/content/sections/projects-showcase.schema";
import { LineAdvisorSection } from "@/components/sections/line-advisor-section";
import { lineAdvisorSectionSchema } from "@/lib/validations/content/sections/line-advisor.schema";
import { HomeProductionLinesSection } from "@/components/sections/home-production-lines-section";

export default async function HomePage() {
  const [
    pageContent,
    defaults,
    aboutContent,
    guidesContent,
    projectsContent,
    lineAdvisorContent,
  ] = await Promise.all([
    readYamlContent(pageContentSchema, "fa", ["home"]),
    getSiteDefaults(),
    readYamlContent(aboutSectionSchema, "fa", ["sections", "about"]),
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
        pageSegments={["home"]}
        variant="home"
      />

      <AboutSection content={aboutContent} />

      {/* {pageContent.cardGrid ? (
        <ContentCardGridSection content={pageContent.cardGrid} />
      ) : null} */}
{pageContent.cardGrid ? (
  <HomeProductionLinesSection content={pageContent.cardGrid} />
) : null}
      <GuidesSection content={guidesContent} />

      <ProjectsShowcaseSection content={projectsContent} />
      <LineAdvisorSection content={lineAdvisorContent} />
    </main>
  );
}
