import Link from "next/link";
import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { Logo } from "@/components/svg/logo";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteSettings } from "@/lib/site/get-site-settings";
import { footerContentSchema } from "@/lib/validations/content/site/footer.schema";

const socialIcons = {
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
  YouTube: FaYoutube,
  Facebook: FaFacebookF,
} as const;

export async function SiteFooter() {
  const [settings, footerContent] = await Promise.all([
    getSiteSettings(),
    readYamlContent(footerContentSchema, "fa", ["site", "footer"]),
  ]);

  const { contact, socialLinks } = settings;

  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:items-start [direction:ltr]">
          <div className="text-center [direction:ltr] md:text-left">
            <Link
              href={contact.email.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-colors hover:text-primary"
            >
              <Mail className="size-4 text-primary" />
              {contact.email.label}
            </Link>

            <div className="mt-5 flex justify-center gap-2 md:justify-start">
              {socialLinks.map((item) => {
                const Icon =
                  socialIcons[item.label as keyof typeof socialIcons];

                if (!Icon) return null;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-md bg-primary/85 text-secondary transition-all duration-300 hover:-translate-y-1 hover:bg-primary"
                  >
                    <Icon className="size-4" />
                  </Link>
                );
              })}
            </div>

            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-3 text-right"
            >
              <div className="flex flex-col leading-none">
                <span className="text-[1.35rem] font-extrabold tracking-wide text-white">
                  SEAMERCO
                </span>

                <span className="mt-1 text-sm font-medium text-white/85">
                  {settings.site.name}
                </span>
              </div>

              <Logo size={52} />
            </Link>
          </div>

          <div className="space-y-4 text-center [direction:rtl] md:text-right">
            <Link
              href={contact.officePhone.href}
              className="flex items-center justify-center gap-3 text-sm text-white/90 transition-colors hover:text-primary md:justify-start"
            >
              <Phone className="size-5 text-primary" />
              {contact.officePhone.label}
            </Link>

            <Link
              href={contact.mobile.href}
              className="flex items-center justify-center gap-3 text-sm text-white/90 transition-colors hover:text-primary md:justify-start"
            >
              <Smartphone className="size-5 text-primary" />
              {contact.mobile.label}
            </Link>

            <Link
              href={contact.whatsapp.href}
              className="flex items-center justify-center gap-3 text-sm text-white/90 transition-colors hover:text-primary md:justify-start"
            >
              <Smartphone className="size-5 text-primary" />
              {contact.whatsapp.label}
            </Link>

            <p className="pt-2 text-sm font-bold text-white">
              {footerContent.notice}
            </p>
          </div>

          <div className="space-y-5 text-center [direction:rtl] md:text-right">
            <Link
              href={contact.officeAddress.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-center gap-3 text-sm leading-7 text-white/90 transition-colors hover:text-primary md:justify-start"
            >
              <MapPin className="mt-1 size-5 shrink-0 text-primary" />
              <span>{contact.officeAddress.label}</span>
            </Link>

            <Link
              href={contact.workshopAddress.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-center gap-3 text-sm leading-7 text-white/90 transition-colors hover:text-primary md:justify-start"
            >
              <MapPin className="mt-1 size-5 shrink-0 text-primary" />
              <span>{contact.workshopAddress.label}</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-5 text-center text-xs text-white/80">
          {footerContent.copyright}
        </div>
      </div>
    </footer>
  );
}