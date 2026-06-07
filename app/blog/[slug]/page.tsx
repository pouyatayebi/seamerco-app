import { HeroOnlyMarkdownPage } from "@/components/pages/hero-only-markdown-page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  return <HeroOnlyMarkdownPage segments={["blog", slug]} />;
}