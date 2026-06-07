import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/lib/validations/content/site/navigation.schema";

type SiteNavigationProps = {
  items: NavigationItem[];
};

export function SiteNavigation({ items }: SiteNavigationProps) {
  return (
    <nav className="hidden items-center lg:flex" aria-label="منوی اصلی سایت">
      {items.map((item) => {
        const hasLinks = Boolean(item.links?.length);

        return (
          <div key={item.href} className="group relative">
            <Link
              href={item.href}
              className={cn(
                "flex h-12 items-center gap-1 px-3 text-sm font-normal text-white/75",
                "transition-colors hover:bg-white/10 hover:text-white"
              )}
            >
              {item.title}
              {hasLinks ? <ChevronDown className="size-3" /> : null}
            </Link>

            {hasLinks ? (
              <div className="invisible absolute right-0 top-full z-50 min-w-72 translate-y-2 rounded-b-xl border bg-card p-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="grid gap-1">
                  {item.links?.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}