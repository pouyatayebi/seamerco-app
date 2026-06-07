import { HeroOnlyYamlPage } from "@/components/pages/hero-only-yaml-page";

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function MachineryCategoryPage({ params }: PageProps) {
  const { category } = await params;
  return <HeroOnlyYamlPage segments={["machinery", category]} />;
}