import { Container } from "@/components/shared/container";
import { VideoGuideCard } from "@/components/shared/video-guide-card";
import { getPageMediaUrl } from "@/lib/media/media-url";
import type { GuidesSectionContent } from "@/lib/validations/content/sections/guides.schema";

type GuidesSectionProps = {
  content: GuidesSectionContent;
  mediaSegments?: string[];
};

export function GuidesSection({
  content,
  mediaSegments = ["sections", "guides"],
}: GuidesSectionProps) {
  const [factorySetup, manufacturing] = content.items;

  if (!factorySetup || !manufacturing) return null;

  return (
    <section className="section bg-surface">
      <Container size="content">
        <div className="grid gap-8 lg:grid-cols-[1fr_15rem_1fr_15rem] lg:items-stretch lg:gap-10 [direction:rtl]">
          <VideoGuideCard
            variant="text"
            titleTop={manufacturing.titleTop}
            titleBottom={manufacturing.titleBottom}
            description={manufacturing.description}
            buttonTextTop={manufacturing.buttonTextTop}
            buttonTextBottom={manufacturing.buttonTextBottom}
            href={manufacturing.href}
          />

          <VideoGuideCard
            variant="media"
            title={`${manufacturing.titleTop} ${manufacturing.titleBottom}`}
            image={getPageMediaUrl(mediaSegments, manufacturing.image)}
            video={getPageMediaUrl(mediaSegments, manufacturing.video)}
          />

          <VideoGuideCard
            variant="text"
            titleTop={factorySetup.titleTop}
            titleBottom={factorySetup.titleBottom}
            description={factorySetup.description}
            buttonTextTop={factorySetup.buttonTextTop}
            buttonTextBottom={factorySetup.buttonTextBottom}
            href={factorySetup.href}
          />

          <VideoGuideCard
            variant="media"
            title={`${factorySetup.titleTop} ${factorySetup.titleBottom}`}
            image={getPageMediaUrl(mediaSegments, factorySetup.image)}
            video={getPageMediaUrl(mediaSegments, factorySetup.video)}
          />
        </div>
      </Container>
    </section>
  );
}