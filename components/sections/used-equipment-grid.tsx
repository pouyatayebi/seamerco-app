"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, CircleGauge, Factory, Settings2 } from "lucide-react";

import type { UsedEquipmentCardItem } from "@/lib/content/get-used-equipment-items";
import { cn } from "@/lib/utils";

type UsedEquipmentGridProps = {
  items: UsedEquipmentCardItem[];
  labels: {
    allLabel: string;
    machineLabel: string;
    lineLabel: string;
  };
};

const statusLabel = {
  available: "آماده فروش",
  reserved: "رزروشده",
  refurbishing: "در حال بازسازی",
  sold: "فروخته‌شده",
};

export function UsedEquipmentGrid({ items, labels }: UsedEquipmentGridProps) {
  const [activeType, setActiveType] = useState<"all" | "machine" | "production-line">("all");

  const filteredItems = useMemo(() => {
    if (activeType === "all") return items;
    return items.filter((item) => item.type === activeType);
  }, [activeType, items]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2 rounded-[1.5rem] border bg-white p-3 shadow-sm">
        {[
          { key: "all", label: labels.allLabel },
          { key: "machine", label: labels.machineLabel },
          { key: "production-line", label: labels.lineLabel },
        ].map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => setActiveType(filter.key as typeof activeType)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-bold transition",
              activeType === filter.key
                ? "bg-primary text-primary-foreground"
                : "bg-surface text-content-muted hover:text-foreground"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-md transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
          >
            <div className="relative h-52 overflow-hidden bg-muted">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-primary">
                {statusLabel[item.status]}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-4 text-right">
              <p className="flex items-center gap-1 text-xs font-bold text-primary">
                {item.type === "machine" ? (
                  <Settings2 className="size-4" />
                ) : (
                  <Factory className="size-4" />
                )}
                {item.category}
              </p>

              <h2 className="mt-3 text-base font-black leading-7 text-foreground">
                {item.title}
              </h2>

              {item.excerpt ? (
                <p className="mt-3 line-clamp-3 text-justify text-sm leading-7 text-content-muted">
                  {item.excerpt}
                </p>
              ) : null}

              <div className="mt-auto space-y-1 pt-4">
                {item.capacity ? (
                  <p className="flex items-center gap-1.5 text-xs text-foreground/80">
                    <CircleGauge className="size-4 text-primary" />
                    ظرفیت: {item.capacity}
                  </p>
                ) : null}

                {item.condition ? (
                  <p className="flex items-center gap-1.5 text-xs text-foreground/80">
                    <BadgeCheck className="size-4 text-primary" />
                    وضعیت فنی: {item.condition}
                  </p>
                ) : null}
              </div>

              <span className="mt-5 inline-flex w-fit items-center gap-1 rounded-xl bg-muted px-4 py-2 text-xs font-bold text-muted-foreground transition group-hover:bg-secondary group-hover:text-white">
                مشاهده جزئیات
                <ArrowLeft className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}