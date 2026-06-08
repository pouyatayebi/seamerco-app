import Link from "next/link";

import { CatalogDocumentIcon } from "@/components/svg/catalog-document-icon";
import { ProformaInvoiceIcon } from "@/components/svg/proforma-invoice-icon";

type ContentActionButtonsProps = {
  catalogHref?: string;
  proformaHref?: string;
};

function ActionButton({
  href,
  lines,
  icon,
  isExternal,
}: {
  href: string;
  lines: [string, string];
  icon: React.ReactNode;
  isExternal?: boolean;
}) {
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="relative block h-8 w-[112px] rounded-full bg-[#a7b5bb] text-white transition hover:bg-primary"
    >
      <span className="absolute right-1 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#52616c]">
        {icon}
      </span>

      <span className="absolute inset-y-0 left-2 right-9 flex flex-col items-center justify-center text-center text-[10px] font-bold leading-3">
        <span>{lines[0]}</span>
        <span>{lines[1]}</span>
      </span>
    </Link>
  );
}

export function ContentActionButtons({
  catalogHref = "/contact-us",
  proformaHref = "/contact-us",
}: ContentActionButtonsProps) {
  return (
    <div className="flex w-fit flex-row items-center gap-2 sm:flex-col sm:items-start sm:gap-1.5">
      <ActionButton
        href={catalogHref}
        lines={["دانلود", "کاتالوگ"]}
        icon={<CatalogDocumentIcon className="size-4" />}
        isExternal
      />

      <ActionButton
        href={proformaHref}
        lines={["درخواست", "پیش فاکتور"]}
        icon={<ProformaInvoiceIcon className="size-4" />}
      />
    </div>
  );
}