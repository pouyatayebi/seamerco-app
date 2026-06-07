import { HeroSection } from "@/components/sections/hero-section";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { pageContentSchema } from "@/lib/validations/content/page.schema";

type HeroOnlyYamlPageProps = {
  segments: string[];
  variant?: "home" | "page";
};

export async function HeroOnlyYamlPage({
  segments,
  variant = "page",
}: HeroOnlyYamlPageProps) {
  const [content, defaults] = await Promise.all([
    readYamlContent(pageContentSchema, "fa", segments),
    getSiteDefaults(),
  ]);

  return (
    <main>
      <HeroSection
        hero={content.hero}
        defaults={defaults.hero}
        pageSegments={segments}
        variant={variant}
      />
    </main>
  );
}