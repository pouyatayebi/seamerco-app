"use client";

import type { CSSProperties } from "react";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronRight, Minus, Plus, X } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getMediaUrl, getPageMediaUrl } from "@/lib/media/media-url";
import { cn } from "@/lib/utils";
import type { LineLayoutSectionContent } from "@/lib/validations/content/sections/line-layout.schema";

type SolutionLineLayoutSectionProps = {
  lineLayout?: LineLayoutSectionContent;
  mediaSegments: string[];
};

export function SolutionLineLayoutSection({
  lineLayout,
  mediaSegments,
}: SolutionLineLayoutSectionProps) {
  const items = useMemo(
    () => lineLayout?.items?.filter((item) => item.id && item.title) ?? [],
    [lineLayout?.items]
  );

  const [activeId, setActiveId] = useState<string | undefined>();
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });

  if (!lineLayout || !items.length) return null;

  const activeItem = items.find((item) => item.id === activeId);

  const imageSrc = lineLayout.image?.src
    ? getPageMediaUrl(mediaSegments, lineLayout.image.src)
    : getMediaUrl(["site", "defaults", "line-layout.jpg"]);

  return (
    <section className="bg-gradient-to-b from-white via-surface to-white py-12 md:py-16">
      <div className="w-full">
        <div className="grid overflow-hidden border-y bg-white shadow-sm lg:grid-cols-[1fr_18rem] lg:[direction:ltr]">
          <div
            className="relative min-h-[25rem] overflow-hidden bg-white lg:min-h-[34rem] lg:[direction:rtl]"
            onClick={() => setActiveId(undefined)}
          >
            <div className="absolute left-3 top-3 z-30 flex flex-col overflow-hidden rounded-sm border bg-white shadow-sm">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setZoom((value) => Math.min(value + 0.12, 1.7));
                }}
                className="flex size-7 items-center justify-center border-b text-secondary hover:bg-surface"
                aria-label="بزرگ‌نمایی"
              >
                <Plus className="size-4" />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();

                  setZoom((value) => {
                    const nextZoom = Math.max(value - 0.12, 1);

                    if (nextZoom === 1) {
                      setPan({ x: 0, y: 0 });
                    }

                    return nextZoom;
                  });
                }}
                className="flex size-7 items-center justify-center text-secondary hover:bg-surface"
                aria-label="کوچک‌نمایی"
              >
                <Minus className="size-4" />
              </button>
            </div>

            <div className="flex h-full min-h-[25rem] items-center justify-start overflow-hidden lg:min-h-[34rem]">
              <div
                className={cn(
                  "relative aspect-[2.05/1] w-[132%] origin-left touch-none transition-transform duration-300 md:w-[122%] lg:w-[132%] xl:w-[124%] 2xl:w-[118%]",
                  zoom > 1
                    ? "cursor-grab active:cursor-grabbing"
                    : "cursor-default"
                )}
                onPointerDown={(event) => {
                  if (zoom <= 1) return;

                  event.stopPropagation();
                  event.currentTarget.setPointerCapture(event.pointerId);
                  isDraggingRef.current = true;
                  dragStartRef.current = {
                    x: event.clientX,
                    y: event.clientY,
                  };
                  panStartRef.current = pan;
                }}
                onPointerMove={(event) => {
                  if (!isDraggingRef.current || zoom <= 1) return;

                  const dx = event.clientX - dragStartRef.current.x;
                  const dy = event.clientY - dragStartRef.current.y;

                  setPan({
                    x: panStartRef.current.x + dx,
                    y: panStartRef.current.y + dy,
                  });
                }}
                onPointerUp={(event) => {
                  isDraggingRef.current = false;
                  event.currentTarget.releasePointerCapture(event.pointerId);
                }}
                onPointerCancel={() => {
                  isDraggingRef.current = false;
                }}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                }}
              >
                <Image
                  src={imageSrc}
                  alt={lineLayout.image?.alt ?? lineLayout.title ?? ""}
                  fill
                  sizes="(min-width: 1024px) 82vw, 130vw"
                  className="object-contain"
                  draggable={false}
                />

                {items.map((item) => {
                  const isActive = item.id === activeId;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveId(item.id);
                      }}
                      className={cn(
                        "absolute z-10 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_5px_rgba(216,74,43,0.18)] transition",
                        isActive &&
                          "scale-125 shadow-[0_0_0_8px_rgba(216,74,43,0.26)]"
                      )}
                      style={{
                        left: `${item.hotspot?.x ?? 50}%`,
                        top: `${item.hotspot?.y ?? 50}%`,
                      }}
                      aria-label={item.title}
                    />
                  );
                })}

                {activeItem ? (
                  <div
                    className="fixed inset-x-4 bottom-4 z-50 overflow-hidden rounded-2xl bg-secondary text-white shadow-2xl md:absolute md:inset-auto md:left-[var(--hotspot-x)] md:top-[var(--hotspot-y)] md:z-20 md:w-56 md:rounded-lg md:[transform:var(--hotspot-transform)]"
                    onClick={(event) => event.stopPropagation()}
                    style={
                      {
                        "--hotspot-x": `${activeItem.hotspot?.x ?? 50}%`,
                        "--hotspot-y": `${activeItem.hotspot?.y ?? 50}%`,
                        "--hotspot-transform":
                          (activeItem.hotspot?.y ?? 50) < 28
                            ? "translate(-50%, 20%)"
                            : "translate(-50%, -115%)",
                      } as CSSProperties
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setActiveId(undefined)}
                      className="absolute left-2 top-2 z-10 rounded-full bg-white/15 p-1 hover:bg-white/25"
                      aria-label="بستن"
                    >
                      <X className="size-3.5" />
                    </button>

                    {activeItem.image ? (
                      <div className="relative h-32 md:h-24">
                        <Image
                          src={getPageMediaUrl(mediaSegments, activeItem.image)}
                          alt={activeItem.title ?? ""}
                          fill
                          sizes="224px"
                          className="object-cover"
                        />
                      </div>
                    ) : null}

                    <div className="p-4 text-center md:p-3">
                      <h3 className="text-base font-black leading-7 text-white md:text-sm md:leading-6">
                        {activeItem.title}
                      </h3>

                      {activeItem.summary ? (
                        <p className="mt-2 line-clamp-4 text-xs leading-6 text-white/75 md:mt-1.5 md:line-clamp-3 md:text-[11px] md:leading-5">
                          {activeItem.summary}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <aside className="border-t bg-gradient-to-b from-[#f8f8f8] via-[#eeeeee] to-[#f7f7f7] px-5 py-6 text-right lg:border-l lg:border-t-0 lg:[direction:rtl]">
            <p className="text-center text-xs font-medium leading-6 text-muted-foreground">
              برای اطلاعات بیشتر روی هر بخش کلیک کنید
            </p>

            {lineLayout.title ? (
              <h3 className="mt-1.5 text-center text-xl font-semibold leading-8 text-primary">
                {lineLayout.title}
              </h3>
            ) : null}

            {lineLayout.subtitle ? (
              <p className="mt-2 text-center text-xs leading-6 text-muted-foreground">
                {lineLayout.subtitle}
              </p>
            ) : null}

            <Accordion
              type="single"
              collapsible
              value={activeId ?? ""}
              onValueChange={(value) => setActiveId(value || undefined)}
              className="mt-5 border-t border-[#d7d7d7]"
            >
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-[#d7d7d7]"
                >
                  <AccordionTrigger className="group relative py-3.5 pl-0 pr-6 text-right text-sm font-semibold text-secondary hover:no-underline [&>svg]:hidden">
                    <span className="absolute right-0 top-1/2 -translate-y-1/2">
                      <ChevronRight className="size-3.5 text-secondary transition-transform group-data-[state=open]:-rotate-90" />
                    </span>

                    <span className="block w-full text-left">
                      {item.title}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pb-4">
                    {item.summary ? (
                      <p className="text-xs leading-5 text-muted-foreground">
                        {item.summary}
                      </p>
                    ) : null}

                    {item.points?.length ? (
                      <ul className="mt-1 space-y-0.5 text-xs leading-5 text-foreground">
                        {item.points.map((point) => (
                          <li key={point} className="flex items-start gap-1">
                            <span className="mt-[10px] size-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </aside>
        </div>
      </div>
    </section>
  );
}