import { Fragment } from "react";
import Link from "next/link";

type BreadcrumbItem = {
  title: string;
  href?: string;
};

type HeroBreadcrumbProps = {
  items?: BreadcrumbItem[];
};

export function HeroBreadcrumb({ items }: HeroBreadcrumbProps) {
  const safeItems = items?.filter((item) => item.title) ?? [];

  if (!safeItems.length) return null;

  return (
    <div className="mt-5 flex justify-center">
      <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/15 bg-black/20 px-5 py-2 text-xs text-white/70 backdrop-blur-md md:text-sm">
        {safeItems.map((item, index) => {
          const isLast = index === safeItems.length - 1;

          return (
            <Fragment key={`${item.title}-${index}`}>
              {isLast || !item.href ? (
                <span className="font-bold text-white">{item.title}</span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              )}

              {!isLast ? (
                <span className="select-none text-white/35">|</span>
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}