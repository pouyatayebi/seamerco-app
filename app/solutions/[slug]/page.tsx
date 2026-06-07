import { ContentCardGridSection } from "@/components/sections/content-card-grid-section";
import { GuidesSection } from "@/components/sections/guides-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsShowcaseSection } from "@/components/sections/projects-showcase-section";

import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";

import { pageContentSchema } from "@/lib/validations/content/page.schema";
import { guidesSectionSchema } from "@/lib/validations/content/sections/guides.schema";
import { projectsShowcaseSectionSchema } from "@/lib/validations/content/sections/projects-showcase.schema";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;

  const segments = ["solutions", slug];

  const [
    content,
    defaults,
    guidesContent,
    projectsContent,
  ] = await Promise.all([
    readYamlContent(pageContentSchema, "fa", segments),
    getSiteDefaults(),

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
  ]);

  return (
    <main>
      <HeroSection
        hero={content.hero}
        defaults={defaults.hero}
        pageSegments={segments}
      />

      {content.cardGrid ? (
        <ContentCardGridSection content={content.cardGrid} />
      ) : null}

      <GuidesSection content={guidesContent} />

      <ProjectsShowcaseSection content={projectsContent} />
    </main>
  );
}