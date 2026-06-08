import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Smartphone,
} from "lucide-react";

import { LinkedinIcon } from "@/components/svg/linkedin-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Container } from "@/components/shared/container";
import { getPageMediaUrl } from "@/lib/media/media-url";
import type { ContactPageContent } from "@/lib/validations/content/sections/contact-page.schema";

type ContactUsSectionProps = {
  content: ContactPageContent;
  mediaSegments: string[];
  settings: {
    contact: {
      email: { label: string; href: string };
      officePhone: { label: string; href: string };
      mobile: { label: string; href: string };
      whatsapp: { label: string; href: string };
      consultation: {
        label: string;
        mobileLabel: string;
        href: string;
        mobileHref: string;
      };
      officeAddress: { label: string; mapUrl: string };
      workshopAddress: { label: string; mapUrl: string };
    };
  };
};

export function ContactUsSection({
  content,
  settings,
  mediaSegments,
}: ContactUsSectionProps) {
  const { contact } = settings;

  const cards = [
    {
      title: "تلفن دفتر مرکزی",
      value: contact.officePhone.label,
      href: contact.officePhone.href,
      icon: Phone,
    },
    {
      title: "مشاوره فنی",
      value: contact.consultation.mobileLabel,
      href: contact.consultation.mobileHref,
      icon: Headphones,
    },
    {
      title: "واتس‌اپ",
      value: contact.whatsapp.label,
      href: contact.whatsapp.href,
      icon: MessageCircle,
      external: true,
    },
    {
      title: "ایمیل",
      value: contact.email.label,
      href: contact.email.href,
      icon: Mail,
    },
  ];

  return (
    <section className="section bg-background">
      <Container size="content">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(216,74,43,0.22),transparent_20rem),linear-gradient(135deg,#06182a,#003b70_55%,#03101f)] p-6 text-white shadow-[0_30px_90px_rgba(0,0,0,0.25)] md:p-8">
            <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-white/35 to-transparent" />

            {content.intro.eyebrow ? (
              <p className="text-xs font-bold tracking-[0.28em] text-primary">
                {content.intro.eyebrow}
              </p>
            ) : null}

            <h2 className="mt-4 text-2xl font-black leading-[1.7] text-white md:text-3xl">
              {content.intro.title}
            </h2>

            <p className="mt-5 text-justify text-sm leading-8 text-white/75">
              {content.intro.description}
            </p>

            {content.intro.notes.length ? (
              <div className="mt-6 space-y-3">
                {content.intro.notes.map((note) => (
                  <div
                    key={note}
                    className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm leading-7 text-white/75"
                  >
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-2">
              {cards.map((card) => {
                const Icon = card.icon;

                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 transition hover:-translate-y-1 hover:bg-white/[0.1]"
                  >
                    <Icon className="size-5 text-primary" />

                    <p className="mt-3 text-xs text-white/58">{card.title}</p>

                    <p className="mt-1 text-sm font-bold leading-7 text-white">
                      {card.value}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-black">{content.people.title}</h3>

              <div className="mt-5 grid gap-3">
                {content.people.items.map((person) => (
                  <Link
                    key={person.name}
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border bg-white p-4 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
                  >
                    <Avatar className="size-14 border">
                      <AvatarImage
                        src={getPageMediaUrl(mediaSegments, person.image)}
                        alt={person.name}
                      />
                      <AvatarFallback>{person.fallback}</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <p className="font-black text-foreground">
                        {person.name}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-content-muted">
                        {person.role}
                      </p>
                    </div>

                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0a66c2]/10 text-[#0a66c2] transition group-hover:bg-[#0a66c2] group-hover:text-white">
                      <LinkedinIcon className="size-5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border bg-surface p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Building2 className="size-6" />
                </span>

                <div>
                  <h3 className="text-lg font-black">
                    {content.addresses.officeTitle}
                  </h3>

                  <p className="mt-2 text-justify text-sm leading-7 text-content-muted">
                    {contact.officeAddress.label}
                  </p>

                  <Link
                    href={contact.officeAddress.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-bold text-secondary-foreground transition hover:bg-secondary/90"
                  >
                    {content.addresses.officeMapLabel}
                    <MapPin className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MapPin className="size-6" />
                </span>

                <div>
                  <h3 className="text-lg font-black">
                    {content.addresses.workshopTitle}
                  </h3>

                  <p className="mt-2 text-justify text-sm leading-7 text-content-muted">
                    {contact.workshopAddress.label}
                  </p>

                  <Link
                    href={contact.workshopAddress.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold text-foreground transition hover:bg-muted"
                  >
                    {content.addresses.workshopMapLabel}
                    <MapPin className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border bg-white p-6 shadow-sm">
              <div className="flex flex-wrap gap-3">
                <Link
                  href={contact.mobile.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
                >
                  {content.quickActions.callLabel}
                  <Smartphone className="size-4" />
                </Link>

                <Link
                  href={contact.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground transition hover:bg-secondary/90"
                >
                  {content.quickActions.whatsappLabel}
                  <MessageCircle className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}