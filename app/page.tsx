import { AboutSection } from "@/components/sections/about-section";
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
import { SplitFeatureSection } from "@/components/sections/split-feature-section";
import { splitFeatureSectionSchema } from "@/lib/validations/content/sections/split-feature.schema";

export default async function HomePage() {
  const [
    pageContent,
    defaults,
    aboutContent,
    guidesContent,
    projectsContent,
    lineAdvisorContent,
    factoryContent,
    machineryContent,
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
    readYamlContent(splitFeatureSectionSchema, "fa", ["sections", "factory"]),
    readYamlContent(splitFeatureSectionSchema, "fa", ["sections", "machinery"]),
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
        <HomeProductionLinesSection
          content={pageContent.cardGrid}
          layout="wide"
        />
      ) : null}
      {/* <GuidesSection content={guidesContent} /> */}
   
      <SplitFeatureSection
        content={machineryContent}
        mediaSegments={["sections", "machinery"]}
        imagePosition="left"
      />
      <ProjectsShowcaseSection content={projectsContent} />
      {/* <LineAdvisorSection content={lineAdvisorContent} /> */}

      <SplitFeatureSection
        content={factoryContent}
        mediaSegments={["sections", "factory"]}
        imagePosition="right"
      />
    </main>
  );
}
