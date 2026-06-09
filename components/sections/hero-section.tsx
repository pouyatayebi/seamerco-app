import Link from "next/link";
import Image from "next/image";

import { HeroBreadcrumb } from "@/components/sections/hero-breadcrumb";
import {
  heroIconMap,
  type HeroIconKey,
} from "@/components/shared/hero-icon-map";
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

type HeroFeatureItemWithIcon =
  NonNullable<HeroContent["featureLinks"]>["items"][number] & {
    icon?: HeroIconKey;
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
}: {
  featureLinks: NonNullable<HeroContent["featureLinks"]>;
  pageSegments: string[];
}) {
  return (
    <div className="overflow-hidden rounded-[1.35rem] border border-white/45 bg-white/92 p-3 text-foreground shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-md lg:flex lg:items-center lg:gap-5">
      {(featureLinks.titleTop || featureLinks.titleBottom) && (
        <div className="mb-4 flex min-w-56 items-center justify-center border-b border-border/70 pb-4 lg:mb-0 lg:min-w-64 lg:justify-start lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
          <div className="text-right">
            {featureLinks.titleTop ? (
              <div className="mb-1.5 flex items-center justify-end gap-3">
                <span className="h-0.5 w-16 rounded-full bg-primary lg:w-20" />
                <span className="text-lg font-medium leading-7 text-secondary lg:text-[1.35rem]">
                  {featureLinks.titleTop}
                </span>
              </div>
            ) : null}

            {featureLinks.titleBottom ? (
              <p className="text-2xl font-black leading-9 text-secondary lg:text-[1.7rem]">
                {featureLinks.titleBottom}
              </p>
            ) : null}
          </div>
        </div>
      )}

      <div className="grid w-full gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {featureLinks.items.map((rawItem, index) => {
          const item = rawItem as HeroFeatureItemWithIcon;
          const Icon = item.icon ? heroIconMap[item.icon] : null;

          return (
            <Link
              key={item.href ?? `${item.title}-${index}`}
              href={item.href}
              className="group flex h-[3.35rem] items-center gap-2.5 rounded-xl border border-border/80 bg-white px-3 text-right shadow-[0_2px_9px_rgba(0,0,0,0.09)] transition hover:border-primary/60 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
            >
              {Icon ? (
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-primary transition group-hover:bg-primary/10">
                  <Icon className="size-6" />
                </span>
              ) : null}

              <span className="flex min-w-0 flex-col">
                <span className="truncate text-[0.78rem] font-black leading-5 text-foreground md:text-[0.82rem]">
                  {item.title}
                </span>

                {item.subtitle ? (
                  <span className="truncate text-[0.66rem] leading-4 text-content-muted">
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
          {featureLinks.items.map((rawItem, index) => {
            const item = rawItem as HeroFeatureItemWithIcon;
            const Icon = item.icon ? heroIconMap[item.icon] : null;

            return (
              <Link
                key={item.href ?? `${item.title}-${index}`}
                href={item.href}
                className="w-full rounded-lg border border-white/20 bg-white/[0.035] px-3 py-4 text-center transition duration-300 hover:border-primary/70 hover:bg-white/[0.07] sm:w-[260px] lg:w-[250px]"
              >
                {Icon ? (
                  <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-white/10 text-primary">
                    <Icon className="size-10" />
                  </span>
                ) : null}

                <p className="mt-3 text-sm font-bold text-white">
                  {item.title}
                </p>

                {item.subtitle ? (
                  <p className="mt-1 text-xs text-white/65">
                    {item.subtitle}
                  </p>
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
      <div
        className={cn(
          "relative overflow-hidden bg-secondary text-white",
          isHome
            ? "min-h-[calc(100svh-6.25rem)] md:min-h-[calc(100svh-5.5rem)]"
            : "min-h-[calc(78svh-4.75rem)]",
        )}
      >
        {backgroundType === "video" && video ? (
          <video
            src={video}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="pointer-events-none absolute inset-0 size-full object-cover grayscale-[35%] saturate-[0.55] contrast-[1.08]"
          />
        ) : poster ? (
          <Image
            src={poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale-[25%] saturate-[0.65] contrast-[1.05]"
          />
        ) : null}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,20,38,0.62)_0%,rgba(4,31,56,0.58)_35%,rgba(2,22,40,0.78)_100%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_34rem)]" />

        {badgeSrc ? (
          <Image
            src={badgeSrc}
            alt={defaults.badge.alt ?? ""}
            width={176}
            height={176}
            className="absolute left-7 top-8 z-10 hidden w-32 object-contain opacity-90 md:block lg:w-40"
          />
        ) : null}

        <div className="relative z-10 flex min-h-[inherit] flex-col">
          <div
            className={cn(
              "flex flex-1 items-center justify-center px-4 text-center md:px-8",
              isHome ? "pt-8 md:pt-10" : "pt-16",
            )}
          >
            <div
              className={cn(
                "mx-auto max-w-3xl space-y-2.5",
                isHome
                  ? "-translate-y-6 md:-translate-y-10 lg:-translate-y-12"
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
                  className="mx-auto h-auto w-64 object-contain sm:w-80 md:w-[28rem] lg:w-[34rem]"
                />
              ) : null}

              {subtitle ? (
                <div
                  className={cn(
                    "mx-auto flex w-full max-w-xl items-center gap-3 font-normal text-white/90",
                    isHome
                      ? "text-xs sm:text-sm md:text-base lg:text-lg"
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
                    ? "text-3xl sm:text-4xl md:text-5xl lg:text-[48px]"
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
                "w-full px-4 pb-5 sm:px-6 lg:px-8",
                isHome ? "-mt-3 md:-mt-5" : "",
                isCompactFeature && "hidden lg:block",
              )}
            >
              <div className="mx-auto max-w-[62rem]">{FeaturePanel}</div>
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