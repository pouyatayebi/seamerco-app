import Image from "next/image";
import Link from "next/link";

import { HeroBreadcrumb } from "@/components/sections/hero-breadcrumb";
import {
  heroIconMap,
  type HeroIconKey,
} from "@/components/shared/hero-icon-map";
import { getMediaUrl, getPageMediaUrl } from "@/lib/media/media-url";
import { cn } from "@/lib/utils";
import type { HeroContent } from "@/lib/validations/content/sections/hero.schema";
import type { SiteDefaults } from "@/lib/validations/content/site/defaults.schema";

type HeroBreadcrumbItem = {
  title: string;
  href?: string;
};

type HeroContentWithExtras = HeroContent & {
  breadcrumbs?: HeroBreadcrumbItem[];
};

type HeroSectionProps = {
  hero?: HeroContentWithExtras;
  defaults: SiteDefaults["hero"];
  pageSegments: string[];
  variant?: "home" | "page";
};

type HeroFeatureItemWithIcon =
  NonNullable<HeroContent["featureLinks"]>["items"][number] & {
    icon?: HeroIconKey;
  };

function HeroHomeFeaturePanel({
  featureLinks,
}: {
  featureLinks: NonNullable<HeroContent["featureLinks"]>;
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.55rem] border border-white/70 bg-white/94 p-3 text-foreground shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:flex lg:items-stretch lg:gap-4">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-white to-transparent" />

      {(featureLinks.titleTop || featureLinks.titleBottom) && (
        <div className="mb-3 flex items-center justify-start border-b border-border/55 pb-3 lg:mb-0 lg:w-[15rem] lg:shrink-0 lg:justify-end lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
          <div className="text-right">
            {featureLinks.titleTop ? (
              <div className="mb-1 flex items-center justify-end gap-3">
                <span className="h-0.5 w-14 rounded-full bg-primary lg:w-16" />
                <span className="text-base font-semibold leading-7 text-secondary">
                  {featureLinks.titleTop}
                </span>
              </div>
            ) : null}

            {featureLinks.titleBottom ? (
              <h2 className="text-[1.45rem] font-semibold leading-9 text-secondary lg:text-[1.65rem]">
                {featureLinks.titleBottom}
              </h2>
            ) : null}
          </div>
        </div>
      )}

      <div className="relative z-10 grid w-full gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {featureLinks.items.map((rawItem, index) => {
          const item = rawItem as HeroFeatureItemWithIcon;
          const Icon = item.icon ? heroIconMap[item.icon] : null;

          return (
            <Link
              key={item.href ?? `${item.title}-${index}`}
              href={item.href}
              className="group flex h-[3.15rem] items-center gap-2.5 rounded-xl border border-border/65 bg-white px-3 text-right shadow-[0_3px_10px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-[0_8px_18px_rgba(0,0,0,0.13)]"
            >
              {Icon ? (
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface text-primary ring-1 ring-border/60 transition group-hover:bg-primary/10 group-hover:ring-primary/20">
                  <Icon className="size-5" />
                </span>
              ) : null}

              <span className="flex min-w-0 flex-col">
                <span className="truncate text-[0.78rem] font-semibold leading-5 text-foreground">
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
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.35rem] border border-white/14 bg-secondary/92 p-4 text-white shadow-[0_22px_70px_rgba(0,0,0,0.28)] ring-1 ring-white/10 backdrop-blur-xl md:p-5">
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-l from-transparent via-white/28 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_28rem)]" />

      {(featureLinks.titleTop || featureLinks.titleBottom) ? (
        <div className="relative z-10 mb-4 text-center">
          {featureLinks.titleTop ? (
            <p className="text-xs font-black leading-6 text-primary md:text-sm">
              {featureLinks.titleTop}
            </p>
          ) : null}

          {featureLinks.titleBottom ? (
            <h2 className="mt-1 text-xl font-semibold leading-8 text-white md:text-2xl">
              {featureLinks.titleBottom}
            </h2>
          ) : null}
        </div>
      ) : null}

      <div className="relative z-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {featureLinks.items.map((rawItem, index) => {
          const item = rawItem as HeroFeatureItemWithIcon;
          const Icon = item.icon ? heroIconMap[item.icon] : null;

          return (
            <Link
              key={item.href ?? `${item.title}-${index}`}
              href={item.href}
              className="group flex min-h-[6.7rem] flex-col items-center justify-center rounded-xl border border-white/22 bg-white/[0.055] px-2.5 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-1 hover:border-primary/55 hover:bg-white/[0.11] hover:shadow-[0_14px_35px_rgba(0,0,0,0.18)]"
            >
              {Icon ? (
                <span className="mb-2 flex size-11 items-center justify-center rounded-full bg-white/95 text-primary shadow-sm transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </span>
              ) : null}

              <span className="line-clamp-1 text-[0.78rem] font-black leading-5 text-white">
                {item.title}
              </span>

              {item.subtitle ? (
                <span className="mt-0.5 line-clamp-1 text-[0.66rem] leading-4 text-white/68">
                  {item.subtitle}
                </span>
              ) : null}
            </Link>
          );
        })}
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
    : isHome && defaults.video
      ? getMediaUrl(["site", "defaults", defaults.video])
      : undefined;

  const backgroundType = hero?.backgroundType ?? (video ? "video" : "image");

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
  const breadcrumbs = hero?.breadcrumbs ?? [];

  const featurePanel =
    hasFeatureLinks && featureLinks ? (
      isCompactFeature ? (
        <HeroCompactFeaturePanel featureLinks={featureLinks} />
      ) : (
        <HeroHomeFeaturePanel featureLinks={featureLinks} />
      )
    ) : null;

  return (
    <section className="bg-background">
      <div
        className={cn(
          "relative overflow-hidden bg-secondary text-white",
          isHome
            ? "min-h-[calc(100svh-6.25rem)] md:min-h-[calc(100svh-5.5rem)]"
            : hasFeatureLinks
              ? "min-h-[calc(100svh-5.5rem)]"
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
              isHome ? "pt-8 md:pt-10" : hasFeatureLinks ? "pt-10" : "pt-16",
            )}
          >
            <div
              className={cn(
                "mx-auto max-w-3xl space-y-2.5",
                isHome
                  ? "-translate-y-6 md:-translate-y-10 lg:-translate-y-12"
                  : hasFeatureLinks
                    ? "-translate-y-8 md:-translate-y-12"
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
                  "text-balance font-medium tracking-tight text-white",
                  isHome
                    ? "text-3xl sm:text-4xl md:text-5xl lg:text-[48px]"
                    : "text-3xl leading-[1.5] md:text-5xl",
                )}
              >
                {title}
              </h1>

              {!isHome && breadcrumbs.length ? (
                <HeroBreadcrumb items={breadcrumbs} />
              ) : null}
            </div>
          </div>

          {hasFeatureLinks ? (
            <div
              className={cn(
                "hidden w-full px-4 pb-5 sm:px-6 lg:block lg:px-8",
                isHome ? "-mt-3 md:-mt-5" : "",
              )}
            >
              <div
                className={cn(
                  "mx-auto",
                  isCompactFeature ? "max-w-[72rem]" : "max-w-[62rem]",
                )}
              >
                {featurePanel}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {hasFeatureLinks ? (
        <div
          className={cn(
            "px-4 py-4 sm:px-6 md:py-5 lg:hidden",
            isHome && "bg-background",
          )}
        >
          <div className="mx-auto max-w-6xl">{featurePanel}</div>
        </div>
      ) : null}
    </section>
  );
}