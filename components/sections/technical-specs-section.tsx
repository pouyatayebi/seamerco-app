import type { ReactNode } from "react";
import { CheckCircle2, Settings2 } from "lucide-react";

import { Container } from "@/components/shared/container";
import { TechnicalSpecsCornerPattern } from "@/components/svg/patterns/technical-specs-corner-pattern";

import type { TechnicalSpecsSectionContent } from "@/lib/validations/content/sections/technical-specs.schema";

type TechnicalSpecsSectionProps = {
  content?: TechnicalSpecsSectionContent;
};

export function TechnicalSpecsSection({
  content,
}: TechnicalSpecsSectionProps) {
  if (!content) return null;

  return (
    <section className="section relative overflow-hidden bg-secondary text-white">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--secondary)_0%,color-mix(in_srgb,var(--secondary)_86%,black)_55%,color-mix(in_srgb,var(--secondary)_68%,black)_100%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(255_255_255/0.12),transparent_30rem)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,color-mix(in_srgb,var(--primary)_22%,transparent),transparent_26rem)]" />

      {/* Orange industrial pattern */}
     <TechnicalSpecsCornerPattern
  className="pointer-events-none absolute inset-0 h-full w-full"
  opacity={1}
/>

      <Container size="content" className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <TechnicalListBlock
            title={content.specificationTitle}
            icon={<Settings2 className="size-5" />}
            items={content.specifications.map((item) => ({
              title: `${item.label}: ${item.value}${
                item.unit ? ` ${item.unit}` : ""
              }`,
              description: item.description,
            }))}
          />

          <TechnicalListBlock
            title={content.featuresTitle}
            icon={<CheckCircle2 className="size-5" />}
            items={content.features}
          />
        </div>
      </Container>
    </section>
  );
}

function TechnicalListBlock({
  title,
  icon,
  items,
}: {
  title: string;
  icon: ReactNode;
  items: {
    title: string;
    description?: string;
  }[];
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.055] p-5 text-right shadow-[0_20px_60px_rgb(0_0_0/0.18)] backdrop-blur-md md:p-6">
      <div className="mb-6 flex items-center gap-3 text-primary">
        <span className="flex size-9 items-center justify-center rounded-full border border-primary/35 bg-primary/10">
          {icon}
        </span>

        <h2 className="text-xl font-semibold leading-8 text-white">
          {title}
        </h2>
      </div>

      <div className="mb-6 h-px w-full bg-gradient-to-l from-white/20 via-white/10 to-transparent" />

      <ul className="space-y-3 text-[0.9rem] leading-8 text-white/86">
        {items.map((item) => (
          <li
            key={item.title}
            className="group flex items-start gap-3"
          >
            <span className="mt-3 size-1.5 shrink-0 rounded-sm bg-primary transition group-hover:scale-125" />

            <div>
              <p className="font-medium text-white">
                {item.title}
              </p>

              {item.description ? (
                <p className="mt-1 text-[0.8rem] leading-7 text-white/62">
                  {item.description}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}