import { HeroOnlyYamlPage } from "@/components/pages/hero-only-yaml-page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  return <HeroOnlyYamlPage segments={["projects", slug]} />;
}