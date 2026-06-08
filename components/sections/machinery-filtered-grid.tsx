"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CircleGauge,
  Factory,
  Filter,
  Hash,
  Layers3,
  RotateCcw,
} from "lucide-react";

import type {
  MachineryIndexCategory,
  MachineryIndexItem,
} from "@/lib/content/get-machinery-index";
import { cn } from "@/lib/utils";

type SolutionFilter = {
  slug: string;
  title: string;
};

type MachineryFilteredGridProps = {
  categories: MachineryIndexCategory[];
  products: MachineryIndexItem[];
  solutions: SolutionFilter[];
  labels: {
    allLabel: string;
    categoryLabel: string;
    solutionLabel: string;
    allSolutionsLabel: string;
  };
};

function FilterPill({
  active,
  children,
  onClick,
  tone = "primary",
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  tone?: "primary" | "secondary";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-full border px-4 text-xs font-bold transition",
        "hover:-translate-y-0.5 hover:shadow-sm",
        active
          ? tone === "primary"
            ? "border-primary bg-primary text-primary-foreground shadow-sm"
            : "border-secondary bg-secondary text-secondary-foreground shadow-sm"
          : "border-border bg-white text-content-muted hover:border-primary/40 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export function MachineryFilteredGrid({
  categories,
  products,
  solutions,
  labels,
}: MachineryFilteredGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSolution, setActiveSolution] = useState("all");

  const activeCategoryTitle =
    activeCategory === "all"
      ? labels.allLabel
      : categories.find((item) => item.slug === activeCategory)?.title;

  const activeSolutionTitle =
    activeSolution === "all"
      ? labels.allSolutionsLabel
      : solutions.find((item) => item.slug === activeSolution)?.title;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatched =
        activeCategory === "all" || product.categorySlug === activeCategory;

      const solutionMatched =
        activeSolution === "all" ||
        product.relatedSolutions.includes(activeSolution);

      return categoryMatched && solutionMatched;
    });
  }, [activeCategory, activeSolution, products]);

  const hasActiveFilter = activeCategory !== "all" || activeSolution !== "all";

  return (
    <div>
      <div className="relative overflow-hidden rounded-[1.75rem] border bg-white p-4 shadow-[0_14px_40px_rgba(0,0,0,0.06)] md:p-5">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-primary/25 to-transparent" />

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Filter className="size-5" />
              </span>

              <div>
                <p className="text-sm font-black text-foreground">
                  فیلتر ماشین‌آلات
                </p>
                <p className="mt-0.5 text-xs text-content-muted">
                  {filteredProducts.length} دستگاه از {products.length} دستگاه
                  نمایش داده می‌شود
                </p>
              </div>
            </div>

            {hasActiveFilter ? (
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("all");
                  setActiveSolution("all");
                }}
                className="inline-flex h-9 items-center gap-2 rounded-full border bg-surface px-4 text-xs font-bold text-content-muted transition hover:border-primary/40 hover:text-primary"
              >
                حذف فیلترها
                <RotateCcw className="size-3.5" />
              </button>
            ) : null}
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Layers3 className="size-4 text-primary" />
                <p className="text-sm font-black text-foreground">
                  {labels.categoryLabel}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <FilterPill
                  active={activeCategory === "all"}
                  onClick={() => setActiveCategory("all")}
                >
                  {labels.allLabel}
                </FilterPill>

                {categories.map((category) => (
                  <FilterPill
                    key={category.slug}
                    active={activeCategory === category.slug}
                    onClick={() => setActiveCategory(category.slug)}
                  >
                    {category.title}
                  </FilterPill>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <Factory className="size-4 text-secondary" />
                <p className="text-sm font-black text-foreground">
                  {labels.solutionLabel}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <FilterPill
                  active={activeSolution === "all"}
                  onClick={() => setActiveSolution("all")}
                  tone="secondary"
                >
                  {labels.allSolutionsLabel}
                </FilterPill>

                {solutions.map((solution) => (
                  <FilterPill
                    key={solution.slug}
                    active={activeSolution === solution.slug}
                    onClick={() => setActiveSolution(solution.slug)}
                    tone="secondary"
                  >
                    {solution.title}
                  </FilterPill>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t pt-4 text-xs text-content-muted">
            <span className="rounded-full bg-surface px-3 py-1.5">
              نوع ماشین‌آلات:{" "}
              <strong className="text-foreground">
                {activeCategoryTitle}
              </strong>
            </span>

            <span className="rounded-full bg-surface px-3 py-1.5">
              خط تولید:{" "}
              <strong className="text-foreground">
                {activeSolutionTitle}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {filteredProducts.length ? (
        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((item) => (
            <Link
              key={`${item.categorySlug}-${item.href}`}
              href={item.href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-4 text-right">
                <p className="w-fit rounded-full bg-primary/10 px-3 py-1 text-[0.7rem] font-bold text-primary">
                  {item.categoryTitle}
                </p>

                <h2 className="mt-3 text-base font-black leading-7 text-foreground">
                  {item.title}
                </h2>

                {item.subtitle ? (
                  <p className="mt-1 text-xs leading-6 text-content-muted">
                    {item.subtitle}
                  </p>
                ) : null}

                {item.excerpt ? (
                  <p className="mt-3 line-clamp-3 text-justify text-[0.82rem] leading-7 text-content-muted">
                    {item.excerpt}
                  </p>
                ) : null}

                <div className="mt-auto space-y-1 pt-4">
                  {item.capacity ? (
                    <div className="flex items-center gap-1.5 text-xs text-foreground/80">
                      <CircleGauge className="size-4 text-primary" />
                      <span>ظرفیت:</span>
                      <span>{item.capacity}</span>
                    </div>
                  ) : null}

                  {item.code ? (
                    <div className="flex items-center gap-1.5 text-xs text-foreground/80">
                      <Hash className="size-4 text-primary" />
                      <span>کد:</span>
                      <span>{item.code}</span>
                    </div>
                  ) : null}
                </div>

                <span className="mt-5 inline-flex w-fit items-center gap-1 rounded-xl bg-muted px-4 py-2 text-xs font-bold text-muted-foreground transition group-hover:bg-secondary group-hover:text-white">
                  مشاهده ماشین
                  <ArrowLeft className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border bg-card p-8 text-center text-content-muted">
          ماشینی با این فیلترها پیدا نشد.
        </div>
      )}
    </div>
  );
}