import { ContactUsSection } from "@/components/sections/contact-us-section";
import { HeroSection } from "@/components/sections/hero-section";
import { readYamlContent } from "@/lib/content/read-yaml";
import { getSiteDefaults } from "@/lib/site/get-site-defaults";
import { getSiteSettings } from "@/lib/site/get-site-settings";
import { pageContentSchema } from "@/lib/validations/content/page.schema";
import { contactPageSchema } from "@/lib/validations/content/sections/contact-page.schema";

export default async function ContactUsPage() {
  const segments = ["contact-us"];

  const [pageContent, contactContent, defaults, settings] = await Promise.all([
    readYamlContent(pageContentSchema, "fa", segments),
    readYamlContent(contactPageSchema, "fa", segments),
    getSiteDefaults(),
    getSiteSettings(),
  ]);

  return (
    <main>
      <HeroSection
        hero={pageContent.hero}
        defaults={defaults.hero}
        pageSegments={segments}
        variant="page"
      />

      <ContactUsSection
        content={contactContent}
        settings={settings}
        mediaSegments={segments}
      />
    </main>
  );
}