import Link from "next/link";
import Image from "next/image";

import { HeroBreadcrumb } from "@/components/sections/hero-breadcrumb";
import { getMediaUrl, getPageMediaUrl } from "@/lib/media/media-url";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/lib/validations/content/sections/hero.schema";
import type { SiteDefaults } from "@/lib/validations/content/site/defaults.schema";

type HeroSectionProps = {
  hero?: HeroContent;
  defaults: SiteDefaults["hero"];
  pageSegments: string[];
  variant?: "home" | "page";
};

function createBreadcrumbItems(pageSegments: string[], currentTitle: string) {
  if (!pageSegments.length || pageSegments[0] === "home") return [];

  const labels: Record<string, string> = {
    solutions: "خطوط تولید",
    machinery: "ماشین‌آلات",
    projects: "پروژه‌ها",
    blog: "مقالات",
    "about-us": "درباره ما",
    "contact-us": "تماس با ما",
    tomato: "خط تولید رب گوجه فرنگی",
    seamer: "ماشین‌آلات دربندی",
  };

  return [
    { title: "صفحه اصلی", href: "/" },
    ...pageSegments.map((segment, index) => {
      const isLast = index === pageSegments.length - 1;

      return {
        title: isLast ? currentTitle : (labels[segment] ?? segment),
        href: isLast
          ? undefined
          : `/${pageSegments.slice(0, index + 1).join("/")}`,
      };
    }),
  ];
}

function HeroHomeFeaturePanel({
  featureLinks,
  pageSegments,
}: {
  featureLinks: NonNullable<HeroContent["featureLinks"]>;
  pageSegments: string[];
}) {
  return (
    <div className="rounded-2xl bg-background/95 p-4 text-foreground shadow-xl shadow-foreground/20 backdrop-blur lg:flex lg:items-center lg:gap-6">
      {(featureLinks.titleTop || featureLinks.titleBottom) && (
        <div className="mb-4 flex min-w-60 items-center lg:mb-0 lg:min-w-72">
          <div>
            {featureLinks.titleTop ? (
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1 w-10 bg-primary md:w-14 lg:w-24" />
                <span className="text-base font-medium text-secondary md:text-lg lg:text-2xl">
                  {featureLinks.titleTop}
                </span>
              </div>
            ) : null}

            {featureLinks.titleBottom ? (
              <p className="text-xl font-semibold leading-8 text-secondary md:text-2xl lg:text-3xl">
                {featureLinks.titleBottom}
              </p>
            ) : null}
          </div>
        </div>
      )}

      <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featureLinks.items.map((item, index) => {
          const imageSrc = item.image?.src
            ? getPageMediaUrl(pageSegments, item.image.src)
            : undefined;

          return (
            <Link
              key={item.href ?? `${item.title}-${index}`}
              href={item.href}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 text-right shadow-sm transition hover:border-primary/70 hover:shadow-md"
            >
              {imageSrc ? (
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Image
                    src={imageSrc}
                    alt={item.image?.alt ?? item.title}
                    width={28}
                    height={28}
                    className="size-7 object-contain"
                  />
                </span>
              ) : null}

              <span className="flex min-w-0 flex-col">
                <span className="truncate text-xs font-semibold text-foreground md:text-sm">
                  {item.title}
                </span>

                {item.subtitle ? (
                  <span className="truncate text-[11px] text-muted-foreground">
                    {item.subtitle}
                  </span>
                ) : null}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function HeroCompactFeaturePanel({
  featureLinks,
  pageSegments,
}: {
  featureLinks: NonNullable<HeroContent["featureLinks"]>;
  pageSegments: string[];
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(216,74,43,0.18),transparent_34rem),linear-gradient(135deg,#071827,#0b3158_45%,#03101f)] px-4 py-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.38)]">
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {featureLinks.titleTop ? (
          <p className="text-sm font-bold text-primary">
            {featureLinks.titleTop}
          </p>
        ) : null}

        {featureLinks.titleBottom ? (
          <h2 className="mt-1 text-xl font-semibold text-white md:text-2xl">
            {featureLinks.titleBottom}
          </h2>
        ) : null}

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {featureLinks.items.map((item, index) => {
            const imageSrc = item.image?.src
              ? getPageMediaUrl(pageSegments, item.image.src)
              : undefined;

            return (
              <Link
                key={item.href ?? `${item.title}-${index}`}
                href={item.href}
                className="w-full rounded-lg border border-white/20 bg-white/[0.035] px-3 py-4 text-center transition duration-300 hover:border-primary/70 hover:bg-white/[0.07] sm:w-[260px] lg:w-[250px]"
              >
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={item.image?.alt ?? item.title}
                    width={56}
                    height={56}
                    className="mx-auto size-14 object-contain"
                  />
                ) : null}

                <p className="mt-3 text-sm font-bold text-white">
                  {item.title}
                </p>

                {item.subtitle ? (
                  <p className="mt-1 text-xs text-white/65">{item.subtitle}</p>
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function HeroSection({
  hero,
  defaults,
  pageSegments,
  variant = "page",
}: HeroSectionProps) {
  const isHome = variant === "home";
  const title = hero?.title ?? defaults.title;
  const subtitle = hero?.subtitle ?? defaults.subtitle;

  const poster = hero?.poster
    ? getPageMediaUrl(pageSegments, hero.poster)
    : defaults.poster
      ? getMediaUrl(["site", "defaults", defaults.poster])
      : undefined;

  const video = hero?.video
    ? getPageMediaUrl(pageSegments, hero.video)
    : defaults.video
      ? getMediaUrl(["site", "defaults", defaults.video])
      : undefined;

  const backgroundType = hero?.backgroundType ?? "video";    
  const showLogotype = hero?.logotype ?? defaults.logotype.enabled;
  const showBadge = hero?.badge ?? defaults.badge.enabled;

  const logotypeSrc =
    showLogotype && defaults.logotype.src
      ? getMediaUrl(["site", "logo", defaults.logotype.src])
      : undefined;

  const badgeSrc =
    showBadge && defaults.badge.src
      ? getMediaUrl(["site", "defaults", defaults.badge.src])
      : undefined;

  const featureLinks = hero?.featureLinks;
  const hasFeatureLinks = Boolean(featureLinks?.items?.length);
  const isCompactFeature = featureLinks?.variant === "compact";
  const breadcrumbs = createBreadcrumbItems(pageSegments, title);

  const FeaturePanel =
    hasFeatureLinks && featureLinks ? (
      isCompactFeature ? (
        <HeroCompactFeaturePanel
          featureLinks={featureLinks}
          pageSegments={pageSegments}
        />
      ) : (
        <HeroHomeFeaturePanel
          featureLinks={featureLinks}
          pageSegments={pageSegments}
        />
      )
    ) : null;

  return (
    <section className="bg-background">
      <div className="relative overflow-hidden bg-secondary text-white min-h-[calc(100svh-4.75rem)]">
      {backgroundType === "video" && video ? (
  <video
    src={video}
    poster={poster}
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    className="pointer-events-none absolute inset-0 size-full object-cover grayscale-[20%] saturate-[0.8] contrast-[1.05]"
  />
) : poster ? (
  <Image
    src={poster}
    alt=""
    fill
    priority
    sizes="100vw"
    className="object-cover"
  />
) : null}

        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35rem)]" />

        {badgeSrc ? (
          <Image
            src={badgeSrc}
            alt={defaults.badge.alt ?? ""}
            width={176}
            height={176}
            className="absolute left-8 top-10 z-10 hidden w-36 object-contain opacity-95 md:block lg:w-44"
          />
        ) : null}

        <div className="relative z-10 flex min-h-[inherit] flex-col">
          <div className="flex flex-1 items-center justify-center px-4 pt-16 text-center md:px-8">
            <div
              className={cn(
                "mx-auto max-w-3xl space-y-3",
                isHome
                  ? "-translate-y-8 md:-translate-y-14 lg:-translate-y-16"
                  : "-translate-y-2 md:-translate-y-4",
              )}
            >
              {logotypeSrc ? (
                <Image
                  src={logotypeSrc}
                  alt={defaults.logotype.alt ?? ""}
                  width={608}
                  height={180}
                  priority={isHome}
                  className="mx-auto h-auto w-56 object-contain sm:w-64 md:w-[22rem] lg:w-[38rem]"
                />
              ) : null}

              {subtitle ? (
                <div
                  className={cn(
                    "mx-auto flex w-full max-w-xl items-center gap-3 font-normal text-white/90",
                    isHome
                      ? "text-sm sm:text-xs md:text-lg lg:text-2xl"
                      : "text-sm md:text-base",
                  )}
                >
                  <span className="h-px flex-1 bg-white/45" />
                  <span className="shrink-0">{subtitle}</span>
                  <span className="h-px flex-1 bg-white/45" />
                </div>
              ) : null}

              <h1
                className={cn(
                  "text-balance font-semibold tracking-tight text-white",
                  isHome
                    ? "text-2xl sm:text-3xl md:text-4xl lg:text-[52px]"
                    : "text-3xl leading-[1.5] md:text-5xl",
                )}
              >
                {title}
              </h1>

              {!isHome ? <HeroBreadcrumb items={breadcrumbs} /> : null}
            </div>
          </div>

          {hasFeatureLinks ? (
            <div
              className={cn(
                "w-full px-4 pb-6 sm:px-6 lg:px-8",
                isCompactFeature && "hidden lg:block",
              )}
            >
              <div className="mx-auto max-w-6xl">{FeaturePanel}</div>
            </div>
          ) : null}
        </div>
      </div>

      {hasFeatureLinks && isCompactFeature ? (
        <div className="px-4 py-5 sm:px-6 md:py-6 lg:hidden">
          {FeaturePanel}
        </div>
      ) : null}

      {hasFeatureLinks && !isCompactFeature ? (
        <div className="px-4 py-5 sm:px-6 md:py-6 lg:hidden">
          <div className="mx-auto max-w-6xl">{FeaturePanel}</div>
        </div>
      ) : null}
    </section>
  );
}
