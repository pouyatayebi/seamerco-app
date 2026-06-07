import { HeroOnlyYamlPage } from "@/components/pages/hero-only-yaml-page";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function MachinerySinglePage({ params }: PageProps) {
  const { category, slug } = await params;
  return <HeroOnlyYamlPage segments={["machinery", category, slug]} />;
}