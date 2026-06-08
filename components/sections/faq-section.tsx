import Image from "next/image";
import { Plus } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getMediaUrl, getPageMediaUrl } from "@/lib/media/media-url";
import type { FaqSectionContent } from "@/lib/validations/content/sections/faq.schema";

type FaqSectionProps = {
  content?: FaqSectionContent;
  mediaSegments: string[];
};

export function FaqSection({ content, mediaSegments }: FaqSectionProps) {
  if (!content?.items?.length) return null;

  const imageSrc = content.image
    ? getPageMediaUrl(mediaSegments, content.image)
    : getMediaUrl(["site", "defaults", "faq.jpg"]);

  return (
    <section className="section ltr bg-surface">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="order-2 relative overflow-hidden shadow-md lg:order-1">
            <div className="relative aspect-[4/3]">
              <Image
                src={imageSrc}
                alt={content.title}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="mb-8 text-right text-[1.65rem] font-semibold leading-[1.6] text-foreground md:text-[2rem]">
              {content.title}
            </h2>

            <Accordion type="single" collapsible className="border-t">
              {content.items.map((item, index) => (
           <AccordionItem
  key={item.question}
  value={`item-${index}`}
  className="border-b"
>
  <AccordionTrigger className="group flex flex-row items-center justify-between gap-4 py-3.5 text-right text-sm font-medium leading-7 text-foreground hover:no-underline [&>svg]:hidden">
    <span className="flex size-5 shrink-0 items-center justify-center bg-[#2b2b2b] text-white transition group-data-[state=open]:bg-primary">
      <Plus className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-45" />
    </span>

    <span className="flex-1 text-right">{item.question}</span>
  </AccordionTrigger>

  <AccordionContent className="pb-4 pr-1 text-right text-sm leading-7 text-content-muted">
    {item.answer}
  </AccordionContent>
</AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}