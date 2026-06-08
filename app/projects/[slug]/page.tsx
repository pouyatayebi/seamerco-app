import { notFound } from "next/navigation";

import { FaqSection } from "@/components/sections/faq-section";
import { GuidesSection } from "@/components/sections/guides-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LineAdvisorSection } from "@/components/sections/line-advisor-section";
import { ProjectPageSection } from "@/components/sections/project-page-section";
import { RelatedArticlesSection } from "@/components/sections/related-articles-section";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { getSiteSettings } from "@/lib/site/get-site-settings";
import { projectPageSchema } from "@/lib/validations/content/project-page.schema";
import { guidesSectionSchema } from "@/lib/validations/content/sections/guides.schema";
import { lineAdvisorSectionSchema } from "@/lib/validations/content/sections/line-advisor.schema";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getProjectPageData(slug: string) {
  const segments = ["projects", slug];

  try {
    const [content, defaults, settings, guidesContent, advisorContent] =
      await Promise.all([
        readYamlContent(projectPageSchema, "fa", segments),
        getSiteDefaults(),
        getSiteSettings(),
        readYamlContent(guidesSectionSchema, "fa", ["sections", "guides"]),
        readYamlContent(lineAdvisorSectionSchema, "fa", [
          "sections",
          "line-advisor",
        ]),
      ]);

    return {
      segments,
      content,
      defaults,
      settings,
      guidesContent,
      advisorContent,
    };
  } catch {
    notFound();
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  const { segments, content, defaults, settings, guidesContent, advisorContent } =
    await getProjectPageData(slug);

  return (
    <main>
      <HeroSection
        hero={content.hero}
        defaults={defaults.hero}
        pageSegments={segments}
        variant="page"
      />

      <ProjectPageSection content={content} mediaSegments={segments} />

      {content.faq ? (
        <FaqSection content={content.faq} mediaSegments={segments} />
      ) : null}

      {content.relatedArticles ? (
        <RelatedArticlesSection content={content.relatedArticles} />
      ) : null}

      <GuidesSection content={guidesContent} />

      <LineAdvisorSection
        content={advisorContent}
        whatsappHref={settings.contact.whatsapp.href}
      />
    </main>
  );
}