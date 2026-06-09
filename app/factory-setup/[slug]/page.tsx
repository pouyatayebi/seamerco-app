import { notFound } from "next/navigation";

import { FaqSection } from "@/components/sections/faq-section";
import { FactorySetupStepSection } from "@/components/sections/factory-setup-step-section";
import { GuidesSection } from "@/components/sections/guides-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LineAdvisorSection } from "@/components/sections/line-advisor-section";
import { RelatedArticlesSection } from "@/components/sections/related-articles-section";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { getSiteSettings } from "@/lib/site/get-site-settings";
import { factorySetupStepSchema } from "@/lib/validations/content/factory-setup-step.schema";
import { guidesSectionSchema } from "@/lib/validations/content/sections/guides.schema";
import { lineAdvisorSectionSchema } from "@/lib/validations/content/sections/line-advisor.schema";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getFactorySetupStepData(slug: string) {
  const segments = ["factory-setup", slug];

  try {
    const [content, defaults, settings, guidesContent, advisorContent] =
      await Promise.all([
        readYamlContent(factorySetupStepSchema, "fa", segments),
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

export default async function FactorySetupStepPage({ params }: PageProps) {
  const { slug } = await params;

  const { segments, content, defaults, settings, guidesContent, advisorContent } =
    await getFactorySetupStepData(slug);

  return (
    <main>
      <HeroSection
        hero={content.hero}
        defaults={defaults.hero}
        pageSegments={segments}
        variant="page"
      />

      <FactorySetupStepSection content={content} mediaSegments={segments} />

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