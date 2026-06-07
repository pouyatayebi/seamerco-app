import Link from "next/link";
import { Headphones, MapPin } from "lucide-react";

import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { SiteBrand } from "@/components/layout/site-brand";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { TechnicalInfoDialog } from "@/components/layout/technical-info-dialog";
import { Container } from "@/components/shared/container";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteSettings } from "@/lib/site/get-site-settings";
import { headerContentSchema } from "@/lib/validations/content/site/header.schema";
import { navigationSchema } from "@/lib/validations/content/site/navigation.schema";

export async function SiteHeader() {
  const [settings, navigation, headerContent] = await Promise.all([
    getSiteSettings(),
    readYamlContent(navigationSchema, "fa", ["site", "navigation"]),
    readYamlContent(headerContentSchema, "fa", ["site", "header"]),
  ]);

  return (
    <header className="sticky top-0 z-50 text-white">
      <div className="hidden bg-header-top py-1 text-xs font-light md:block">
        <Container size="header" className="flex h-6 items-center">
          <Link
            href={settings.contact.officeAddress.mapUrl}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
          >
            <MapPin className="size-3 text-primary" />
            {settings.contact.officeAddress.label}
          </Link>

          <Link
            href={settings.contact.officePhone.href}
            className="mr-4 text-white/80 transition-colors hover:text-white"
          >
            {settings.contact.officePhone.label}
          </Link>

          <Link
            href={settings.contact.consultation.href}
            className="mr-8 inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
          >
            <Headphones className="size-3 text-primary" />
            {settings.contact.consultation.label}
          </Link>

          <Link
            href={settings.contact.consultation.mobileHref}
            className="mr-3 text-white/80 transition-colors hover:text-white"
          >
            {settings.contact.consultation.mobileLabel}
          </Link>

          <div className="mr-8">
            <TechnicalInfoDialog
              triggerLabel={headerContent.topBar.technicalRequestLabel}
              content={headerContent.technicalDialog}
              whatsappHref={settings.contact.whatsapp.href}
            />
          </div>
        </Container>
      </div>

      <div className="bg-header-main">
        <Container size="header">
          <div className="flex h-12 items-center gap-10">
            <SiteBrand
              topTitle={settings.brand.top}
              bottomTitle={settings.brand.bottom}
            />

            <SiteNavigation items={navigation.items} />

            <div className="mr-auto lg:hidden">
              <MobileNavigation
                items={navigation.items}
                brandTopTitle={settings.brand.top}
                brandBottomTitle={settings.brand.bottom}
              />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}