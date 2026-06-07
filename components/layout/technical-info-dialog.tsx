"use client";

import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { HeaderContent } from "@/lib/validations/content/site/header.schema";

type TechnicalInfoDialogProps = {
  content: HeaderContent["technicalDialog"];
  triggerLabel: string;
  whatsappHref: string;
};

export function TechnicalInfoDialog({
  content,
  triggerLabel,
  whatsappHref,
}: TechnicalInfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="border-b border-white/60 pb-0.5 text-white/85 transition-colors hover:text-white">
        {triggerLabel}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription className="leading-8">
            {content.description}
          </DialogDescription>
        </DialogHeader>

        <Link
          href={whatsappHref}
          target="_blank"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {content.whatsappButtonLabel}
        </Link>
      </DialogContent>
    </Dialog>
  );
}
