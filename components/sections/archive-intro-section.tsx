import { Boxes, Factory, FolderKanban } from "lucide-react";

import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

type ArchiveIntroSectionVariant = "machinery" | "solutions" | "projects";

type ArchiveIntroSectionProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  variant?: ArchiveIntroSectionVariant;
  stats?: {
    label: string;
    value: string | number;
  }[];
};

const variantConfig = {
  machinery: {
    icon: Boxes,
    label: "MACHINERY ARCHIVE",
  },
  solutions: {
    icon: Factory,
    label: "PRODUCTION LINES",
  },
  projects: {
    icon: FolderKanban,
    label: "PROJECT PORTFOLIO",
  },
} satisfies Record<
  ArchiveIntroSectionVariant,
  {
    icon: React.ElementType;
    label: string;
  }
>;

export function ArchiveIntroSection({
  title,
  description,
  eyebrow,
  variant = "machinery",
  stats = [],
}: ArchiveIntroSectionProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <section className="relative overflow-hidden bg-background py-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(216,74,43,0.08),transparent_24rem),radial-gradient(circle_at_88%_10%,rgba(0,59,112,0.10),transparent_28rem)]" />

      <Container size="content" className="relative">
        <div className="overflow-hidden rounded-[2rem] border bg-white shadow-[0_22px_70px_rgba(0,0,0,0.08)]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </span>

                <div>
                  <p className="text-xs font-black tracking-[0.22em] text-primary">
                    {eyebrow ?? config.label}
                  </p>

                  <h2 className="mt-2 text-2xl font-black leading-[1.6] text-foreground md:text-3xl">
                    {title}
                  </h2>
                </div>
              </div>

              {description ? (
                <p className="mt-6 max-w-3xl text-justify text-sm leading-8 text-content-muted md:text-[0.95rem]">
                  {description}
                </p>
              ) : null}
            </div>

            <div className="relative flex min-h-52 flex-col justify-center overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(216,74,43,0.18),transparent_18rem),linear-gradient(135deg,#06182a,#003b70_58%,#03101f)] p-6 text-white md:p-8">
              <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-white/35 to-transparent" />

              <p className="text-sm font-bold leading-7 text-white/72">
                مسیر سریع برای بررسی، مقایسه و انتخاب گزینه مناسب بر اساس نیاز
                پروژه، ظرفیت تولید و نوع محصول.
              </p>

              {stats.length ? (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.07] p-4"
                    >
                      <p className="text-2xl font-black text-white">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs leading-6 text-white/62">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {["طراحی مهندسی", "ساخت صنعتی", "نصب و راه‌اندازی", "پشتیبانی فنی"].map(
                    (item) => (
                      <div
                        key={item}
                        className={cn(
                          "rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3",
                          "text-sm font-bold text-white/82"
                        )}
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}