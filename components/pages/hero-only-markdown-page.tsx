import { HeroSection } from "@/components/sections/hero-section";
import { readMarkdownContent } from "@/lib/content/read-markdown";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { blogFrontmatterSchema } from "@/lib/validations/content/blog.schema";

type HeroOnlyMarkdownPageProps = {
  segments: string[];
};

export async function HeroOnlyMarkdownPage({
  segments,
}: HeroOnlyMarkdownPageProps) {
  const [post, defaults] = await Promise.all([
    readMarkdownContent(blogFrontmatterSchema, "fa", segments),
    getSiteDefaults(),
  ]);

  return (
    <main>
      <HeroSection
        hero={
          post.frontmatter.hero ?? {
            title: post.frontmatter.title,
            subtitle: post.frontmatter.description,
          }
        }
        defaults={defaults.hero}
        pageSegments={segments}
        variant="page"
      />
    </main>
  );
}