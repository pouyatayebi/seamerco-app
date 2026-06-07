import Link from "next/link";

import { Logo } from "@/components/svg/logo";
import { cn } from "@/lib/utils";

type SiteBrandProps = {
  href?: string;
  logoSize?: number;
  className?: string;

  topTitle: string;
  bottomTitle: string;
};

export function SiteBrand({
  href = "/",
  logoSize = 34,
  className,
  topTitle,
  bottomTitle,
}: SiteBrandProps) {
  return (
    <Link
      href={href}
      className={cn("flex shrink-0 items-center gap-1", className)}
    >
      <Logo size={logoSize} />

      <span className="flex flex-col leading-none">
        <span className="-mr-1 text-xs font-normal tracking-wide text-white">
          {topTitle}
        </span>

        <span className="text-lg font-medium leading-tight text-white/85">
          {bottomTitle}
        </span>
      </span>
    </Link>
  );
}