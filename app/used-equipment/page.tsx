import { ArchiveIntroSection } from "@/components/sections/archive-intro-section";
import { HeroSection } from "@/components/sections/hero-section";
import { UsedEquipmentGrid } from "@/components/sections/used-equipment-grid";
import { getUsedEquipmentItems } from "@/lib/content/get-used-equipment-items";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { usedEquipmentIndexSchema } from "@/lib/validations/content/used-equipment-index.schema";

export default async function UsedEquipmentPage() {
  const segments = ["used-equipment"];

  const [content, defaults, items] = await Promise.all([
    readYamlContent(usedEquipmentIndexSchema, "fa", segments),
    getSiteDefaults(),
    getUsedEquipmentItems("fa"),
  ]);

  return (
    <main>
      <HeroSection
        hero={content.hero}
        defaults={defaults.hero}
        pageSegments={segments}
        variant="page"
      />

      <ArchiveIntroSection
        variant="machinery"
        title={content.title}
        description={content.description}
        stats={[
          { label: "ماشین‌آلات و خطوط", value: items.length },
          { label: "نوع عرضه", value: "بازسازی‌شده" },
        ]}
      />

      <section className="section bg-background pt-0">
        <div className="container-content">
          <UsedEquipmentGrid
            items={items}
            labels={{
              allLabel: content.filters?.allLabel ?? "همه موارد",
              machineLabel: content.filters?.machineLabel ?? "ماشین‌آلات",
              lineLabel: content.filters?.lineLabel ?? "خطوط تولید",
            }}
          />
        </div>
      </section>
    </main>
  );
}