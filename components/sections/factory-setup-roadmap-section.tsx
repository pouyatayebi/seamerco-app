import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  PackageCheck,
} from "lucide-react";

import { Container } from "@/components/shared/container";
import type { FactorySetupRoadmapStep } from "@/lib/content/get-factory-setup-steps";
import { cn } from "@/lib/utils";

type FactorySetupRoadmapSectionProps = {
  title: string;
  description?: string;
  detailButtonLabel: string;
  steps: FactorySetupRoadmapStep[];
};

function formatStepNumber(order: number) {
  return order.toString().padStart(2, "0");
}

export function FactorySetupRoadmapSection({
  title,
  description,
  detailButtonLabel,
  steps,
}: FactorySetupRoadmapSectionProps) {
  if (!steps.length) return null;

  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-18">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(216,74,43,0.08),transparent_24rem),radial-gradient(circle_at_88%_8%,rgba(0,59,112,0.10),transparent_28rem)]" />

      <Container size="content" className="relative">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="eyebrow justify-center">FACTORY SETUP ROADMAP</p>

          <h2 className="section-title mt-3">{title}</h2>

          {description ? (
            <p className="lead mx-auto mt-6 max-w-3xl text-center">
              {description}
            </p>
          ) : null}
        </div>

        <div className="relative">
          <div className="absolute bottom-12 right-8 top-12 hidden w-px bg-gradient-to-b from-primary/5 via-primary/45 to-primary/5 xl:block" />

          <div className="space-y-7">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.slug}
                  className="relative grid gap-4 xl:grid-cols-[4.5rem_1fr]"
                >
                  <div className="relative hidden xl:block">
                    <div className="sticky top-28 flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-white text-primary shadow-[0_14px_34px_rgba(216,74,43,0.16)]">
                      <span className="absolute -inset-2 rounded-[1.35rem] bg-primary/5" />
                      <span className="relative text-xl font-black">
                        {formatStepNumber(step.order)}
                      </span>
                    </div>
                  </div>

                  <article className="group relative overflow-hidden rounded-[2rem] border bg-white shadow-[0_18px_60px_rgba(0,0,0,0.07)] transition hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(0,0,0,0.1)]">
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-primary/25 to-transparent" />

                    <div
                      className={cn(
                        "grid gap-0 lg:grid-cols-[22rem_1fr]",
                        !isEven && "lg:grid-cols-[1fr_22rem]"
                      )}
                    >
                      <div
                        className={cn(
                          "relative min-h-64 overflow-hidden bg-muted lg:min-h-full",
                          !isEven && "lg:order-2"
                        )}
                      >
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 352px"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/45 via-transparent to-transparent" />

                        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-primary shadow-sm xl:hidden">
                          مرحله {formatStepNumber(step.order)}
                        </span>
                      </div>

                      <div
                        className={cn(
                          "flex min-h-[22rem] flex-col justify-center p-5 text-right md:p-7",
                          !isEven && "lg:order-1"
                        )}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-black text-primary">
                            <CheckCircle2 className="size-3.5" />
                            مرحله {formatStepNumber(step.order)}
                          </span>

                          {step.duration ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs font-bold text-content-muted">
                              <Clock3 className="size-3.5" />
                              {step.duration}
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-5 text-xl font-black leading-9 text-foreground md:text-2xl">
                          {step.title}
                        </h3>

                        {step.subtitle ? (
                          <p className="mt-2 text-sm font-bold leading-7 text-primary">
                            {step.subtitle}
                          </p>
                        ) : null}

                        {step.excerpt ? (
                          <p className="mt-4 text-justify text-sm leading-8 text-content-muted">
                            {step.excerpt}
                          </p>
                        ) : null}

                        {step.output ? (
                          <div className="mt-5 rounded-2xl border bg-surface p-4">
                            <div className="flex items-start gap-2 text-sm leading-7 text-content-muted">
                              <PackageCheck className="mt-1 size-4 shrink-0 text-primary" />
                              <span>{step.output}</span>
                            </div>
                          </div>
                        ) : null}

                        <Link
                          href={step.href}
                          className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-bold text-secondary-foreground transition hover:bg-secondary/90"
                        >
                          {detailButtonLabel}
                          <ArrowLeft className="size-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}