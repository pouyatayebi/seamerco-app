type PageProps = {
  params: Promise<{
    slug: string;
    variant: string;
  }>;
};

const variantTitleMap: Record<string, string> = {
  can: "بسته‌بندی قوطی",
  glass: "بسته‌بندی شیشه‌ای",
  aseptic: "بسته‌بندی اسپتیک",
  sachet: "بسته‌بندی ساشه",
  bulk: "بسته‌بندی فله‌ای",
};

const solutionTitleMap: Record<string, string> = {
  tomato: "خط تولید رب گوجه فرنگی",
};

export default async function SolutionVariantPage({ params }: PageProps) {
  const { slug, variant } = await params;

  const solutionTitle =
    solutionTitleMap[slug] ?? `خط تولید ${slug.replaceAll("-", " ")}`;

  const variantTitle =
    variantTitleMap[variant] ?? variant.replaceAll("-", " ");

  return (
    <main className="min-h-screen bg-background">
      <section className="section">
        <div className="container-content">
          <div className="rounded-[1.5rem] border border-border bg-card p-8 text-right shadow-sm">
            <p className="eyebrow justify-start">Seamerco Solutions</p>

            <h1 className="mt-3 text-2xl font-black leading-[1.7] text-secondary md:text-4xl">
              {solutionTitle} - {variantTitle}
            </h1>

            <p className="mt-4 text-sm leading-8 text-content-muted md:text-base">
              محتوای این صفحه به‌زودی تکمیل می‌شود.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}