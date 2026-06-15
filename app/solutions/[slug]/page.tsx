import { ContentCardGridSection } from "@/components/sections/content-card-grid-section";
import { GuidesSection } from "@/components/sections/guides-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsShowcaseSection } from "@/components/sections/projects-showcase-section";
import { SolutionLineLayoutSection } from "@/components/sections/solution-line-layout-section";
import { TechnicalSpecsSection } from "@/components/sections/technical-specs-section";
import { FaqSection } from "@/components/sections/faq-section";
import { RelatedArticlesSection } from "@/components/sections/related-articles-section";
import { ContentOverviewSection } from "@/components/sections/content-overview-section";

import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { siteUiSchema } from "@/lib/site/ui.schema";

import { pageContentSchema } from "@/lib/validations/content/page.schema";
import { guidesSectionSchema } from "@/lib/validations/content/sections/guides.schema";
import { projectsShowcaseSectionSchema } from "@/lib/validations/content/sections/projects-showcase.schema";
import { AdditionalContentSection } from "@/components/sections/additional-content-section";
import { readRawMarkdown } from "@/lib/content/read-raw-markdown";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const segments = ["solutions", slug];

  const [content, defaults, guidesContent, projectsContent, ui,additionalContent] =
    await Promise.all([
      readYamlContent(pageContentSchema, "fa", segments),
      getSiteDefaults(),
      readYamlContent(guidesSectionSchema, "fa", ["sections", "guides"]),
      readYamlContent(projectsShowcaseSectionSchema, "fa", [
        "sections",
        "projects-showcase",
      ]),
      readYamlContent(siteUiSchema, "fa", ["site", "ui"]),
      readRawMarkdown("fa", segments),
    ]);

  return (
    <main>
      <HeroSection
        hero={content.hero}
        defaults={defaults.hero}
        pageSegments={segments}
      />

      <ContentOverviewSection
        overview={content.overview}
        mediaSegments={segments}
        ui={ui}
      />

      <TechnicalSpecsSection content={content.technicalSpecs} />

      <SolutionLineLayoutSection
        lineLayout={content.lineLayout}
        mediaSegments={segments}
      />

      {content.cardGrid ? (
        <ContentCardGridSection content={content.cardGrid} />
      ) : null}

      <GuidesSection content={guidesContent} />

      <ProjectsShowcaseSection content={projectsContent} />

      <FaqSection content={content.faq} mediaSegments={segments} />

      {/* <RelatedArticlesSection content={content.relatedArticles} /> */}
      <AdditionalContentSection content={additionalContent} />
    </main>
  );
}