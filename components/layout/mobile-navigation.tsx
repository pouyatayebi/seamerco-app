"use client";

import Link from "next/link";
import { ChevronLeft, Menu } from "lucide-react";

import { SiteBrand } from "@/components/layout/site-brand";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { NavigationItem } from "@/lib/validations/content/site/navigation.schema";

type MobileNavigationProps = {
  items: NavigationItem[];
  brandTopTitle: string;
  brandBottomTitle: string;
};

export function MobileNavigation({
  items,
  brandTopTitle,
  brandBottomTitle,
}: MobileNavigationProps) {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="باز کردن منوی سایت"
        className="inline-flex size-9 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 hover:text-white"
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[320px] overflow-y-auto p-0"
      >
        <SheetHeader className="border-b bg-header-main px-4 py-4 text-right">
          <SheetTitle className="sr-only">
            منوی اصلی سایت
          </SheetTitle>

          <SiteBrand
            logoSize={32}
            topTitle={brandTopTitle}
            bottomTitle={brandBottomTitle}
          />
        </SheetHeader>

        <div className="px-4 py-5">
          <Accordion type="multiple" className="w-full">
            {items.map((item) => {
              const hasLinks = Boolean(item.links?.length);

              if (!hasLinks) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-3 text-sm font-bold text-foreground transition-colors hover:bg-muted"
                  >
                    {item.title}
                  </Link>
                );
              }

              return (
                <AccordionItem
                  key={item.href}
                  value={item.href}
                >
                  <AccordionTrigger className="group rounded-lg px-3 py-3 text-sm font-bold hover:bg-muted hover:no-underline">
                    <span>{item.title}</span>

                    <ChevronLeft className="size-4 transition-transform duration-200 group-data-[state=open]:-rotate-90" />
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="mr-3 mt-1 grid gap-1 border-r pr-3">
                      {item.links?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}