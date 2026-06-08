import { notFound } from "next/navigation";

import { ContentCardGridSection } from "@/components/sections/content-card-grid-section";

import { GuidesSection } from "@/components/sections/guides-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LineAdvisorSection } from "@/components/sections/line-advisor-section";
import { ProjectsShowcaseSection } from "@/components/sections/projects-showcase-section";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getMediaUrl } from "@/lib/media/media-url";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { getSiteSettings } from "@/lib/site/get-site-settings";
import { pageContentSchema } from "@/lib/validations/content/page.schema";
import { guidesSectionSchema } from "@/lib/validations/content/sections/guides.schema";
import { lineAdvisorSectionSchema } from "@/lib/validations/content/sections/line-advisor.schema";
import { projectsShowcaseSectionSchema } from "@/lib/validations/content/sections/projects-showcase.schema";
import { ContentOverviewSection } from "@/components/shared/content-overview-section";

type PageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

async function getPageData(segments: string[]) {
  try {
    const [
      content,
      defaults,
      settings,
      guidesContent,
      projectsContent,
      advisorContent,
    ] = await Promise.all([
      readYamlContent(pageContentSchema, "fa", segments),
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

    return {
      content,
      defaults,
      settings,
      guidesContent,
      projectsContent,
      advisorContent,
    };
  } catch (error){
      console.error("Machinery category page error:", {
   
    segments,
    error,
  });

  throw error;
  }
}

export default async function MachinerySinglePage({ params }: PageProps) {
  const { category, slug } = await params;
  const segments = ["machinery", category, slug];

  const {
    content,
    defaults,
    settings,
    guidesContent,
    projectsContent,
    advisorContent,
  } = await getPageData(segments);

  const fallbackImage = content.featuredImage
    ? getMediaUrl([...segments, content.featuredImage])
    : content.cover
      ? getMediaUrl([...segments, content.cover])
      : content.hero?.poster
        ? getMediaUrl([...segments, content.hero.poster])
        : undefined;

 return (
  <main>
    <HeroSection
      hero={content.hero}
      defaults={defaults.hero}
      pageSegments={segments}
      variant="page"
    />

    <ContentOverviewSection
      overview={content.overview}
      mediaSegments={segments}
      fallbackImage={
        content.featuredImage
          ? getMediaUrl([...segments, content.featuredImage])
          : content.cover
            ? getMediaUrl([...segments, content.cover])
            : content.hero?.poster
              ? getMediaUrl([...segments, content.hero.poster])
              : undefined
      }
      fallbackAlt={content.title ?? content.hero?.title ?? "خط تولید سیمرکو"}
    />

    {content.cardGrid ? (
      <ContentCardGridSection content={content.cardGrid} />
    ) : null}

    <GuidesSection content={guidesContent} />

    <ProjectsShowcaseSection content={projectsContent} />

    <LineAdvisorSection
      content={advisorContent}
      whatsappHref={settings.contact.whatsapp.href}
    />
  </main>
);
}