"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, CircleGauge, Hash } from "lucide-react";

import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type ExpandableCardGridItem = {
  title: string;
  subtitle?: string;
  image?: string;
  href?: string;
  excerpt?: string;
  description?: string;
  capacity?: string;
  code?: string;
};

type ExpandableCardGridProps = {
  title?: string;
  items: ExpandableCardGridItem[];
  detailButtonLabel?: string;
};

type ExpandableCardProps = {
  item: ExpandableCardGridItem;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  detailButtonLabel: string;
};

function ExpandableCard({
  item,
  isOpen,
  onOpenChange,
  detailButtonLabel,
}: ExpandableCardProps) {
  const imageSrc = item.image ?? "/media/site/defaults/card.jpg";

  return (
    <article
      data-expandable-card
      className="group relative flex h-full min-h-[25.5rem] flex-col overflow-hidden rounded-2xl bg-card shadow-md ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-44 overflow-hidden rounded-2xl">
        <Image
          src={imageSrc}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="rounded-2xl object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 text-right">
        <h3 className="text-base font-black text-foreground">{item.title}</h3>

        {item.subtitle ? (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="size-1.5 shrink-0 rounded-full bg-primary" />
            {item.subtitle}
          </p>
        ) : null}

        {item.excerpt ? (
          <p className="mt-3 line-clamp-3 text-justify text-[0.82rem] leading-7 text-foreground/80">
            {item.excerpt}
          </p>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="min-w-0 flex-1 space-y-1">
            {item.capacity ? (
              <div className="flex min-w-0 items-center gap-1.5 text-[0.72rem] leading-5 text-foreground/80">
                <CircleGauge className="size-4 shrink-0 text-primary" />
                <span className="shrink-0">ظرفیت:</span>
                <span className="truncate">{item.capacity}</span>
              </div>
            ) : null}

            {item.code ? (
              <div className="flex min-w-0 items-center gap-1.5 text-[0.72rem] leading-5 text-foreground/80">
                <Hash className="size-4 shrink-0 text-primary" />
                <span className="shrink-0">کد دستگاه:</span>
                <span className="truncate">{item.code}</span>
              </div>
            ) : null}
          </div>

          {item.href ? (
            <Link
              href={item.href}
               prefetch={false}
              className="inline-flex h-7 shrink-0 items-center justify-center rounded-md bg-secondary px-3 text-[0.68rem] font-bold text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              {detailButtonLabel}
            </Link>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        aria-label="نمایش توضیحات بیشتر"
        aria-expanded={isOpen}
        onClick={() => onOpenChange(!isOpen)}
        className="mt-auto flex h-7 w-full items-center justify-center border-t bg-muted text-muted-foreground transition hover:text-primary"
      >
        <ChevronDown
          className={cn(
            "size-5 transition-transform duration-300",
            isOpen && "rotate-180 text-primary",
          )}
        />
      </button>

      <div
        className={cn(
          "absolute inset-x-0 bottom-7 top-0 z-20 overflow-hidden rounded-2xl shadow-2xl transition-all duration-300",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0",
        )}
      >
        <Image
          src={imageSrc}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/85 to-secondary/45" />

        <div className="absolute inset-0 z-10 flex h-full flex-col overflow-y-auto p-4 text-white">
          <h4 className="text-base font-black text-white">{item.title}</h4>

          {item.description ? (
            <p className="mt-3 text-justify text-sm leading-7 text-white/85">
              {item.description}
            </p>
          ) : null}

          {item.href ? (
            <Link
              href={item.href}
               prefetch={false}
              className="mt-auto inline-flex h-8 w-fit items-center justify-center rounded-md bg-primary px-3 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {detailButtonLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ExpandableCardGrid({
  title,
  items,
  detailButtonLabel = "جزئیات بیشتر",
}: ExpandableCardGridProps) {
  const [openCardKey, setOpenCardKey] = useState<string | null>(null);
  const safeItems = items.filter((item) => item.title);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement;
      if (target.closest("[data-expandable-card]")) return;
      setOpenCardKey(null);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenCardKey(null);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!safeItems.length) return null;

  return (
    <section className="section">
      <Container size="content">
        {title ? <h2>{title}</h2> : null}

        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {safeItems.map((item, index) => {
            const key = item.href ?? `${item.title}-${index}`;

            return (
              <ExpandableCard
                key={key}
                item={item}
                isOpen={openCardKey === key}
                detailButtonLabel={detailButtonLabel}
                onOpenChange={(nextIsOpen) =>
                  setOpenCardKey(nextIsOpen ? key : null)
                }
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
