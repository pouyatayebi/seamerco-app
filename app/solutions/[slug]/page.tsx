import { ContentCardGridSection } from "@/components/sections/content-card-grid-section";
import { GuidesSection } from "@/components/sections/guides-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsShowcaseSection } from "@/components/sections/projects-showcase-section";
import { ContentOverviewSection } from "@/components/shared/content-overview-section";
import { SolutionLineLayoutSection } from "@/components/sections/solution-line-layout-section";

import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";

import { pageContentSchema } from "@/lib/validations/content/page.schema";
import { FaqSection } from "@/components/sections/faq-section";
import { guidesSectionSchema } from "@/lib/validations/content/sections/guides.schema";
import { projectsShowcaseSectionSchema } from "@/lib/validations/content/sections/projects-showcase.schema";
import { RelatedArticlesSection } from "@/components/sections/related-articles-section";
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;

  const segments = ["solutions", slug];

  const [content, defaults, guidesContent, projectsContent] = await Promise.all(
    [
      readYamlContent(pageContentSchema, "fa", segments),
      getSiteDefaults(),

      readYamlContent(guidesSectionSchema, "fa", ["sections", "guides"]),

      readYamlContent(projectsShowcaseSectionSchema, "fa", [
        "sections",
        "projects-showcase",
      ]),
    ],
  );

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
        fallbackImage={
          content.featuredImage
            ? `/media/${segments.join("/")}/${content.featuredImage}`
            : content.cover
              ? `/media/${segments.join("/")}/${content.cover}`
              : content.hero?.poster
                ? `/media/${segments.join("/")}/${content.hero.poster}`
                : undefined
        }
        fallbackAlt={content.title ?? content.hero?.title ?? "تصویر سیمرکو"}
      />
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
      <RelatedArticlesSection content={content.relatedArticles} />
    </main>
  );
}
