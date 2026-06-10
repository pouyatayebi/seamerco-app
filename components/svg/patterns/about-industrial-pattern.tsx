import type { SVGProps } from "react";

export function AboutIndustrialPattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 1440 620" fill="none" aria-hidden="true" {...props}>
      <g opacity="0.16">
        <path d="M120 120H190L190 190L120 120Z" fill="currentColor" />
        <path d="M250 70H360L360 180L250 70Z" fill="currentColor" />
        <path d="M345 205H455L345 315V205Z" fill="currentColor" />
        <path d="M510 140H600L600 230L510 140Z" fill="currentColor" />
      </g>

      <g opacity="0.11">
        <path d="M1080 390H1180L1080 490V390Z" fill="currentColor" />
        <path d="M1200 340H1275L1275 415L1200 340Z" fill="currentColor" />
        <path d="M1250 470H1330L1250 550V470Z" fill="currentColor" />
      </g>

      <path
        d="M0 520L90 570L0 620V520Z"
        fill="var(--pattern-accent)"
        opacity="0.28"
      />

      <path
        d="M1280 0L1355 75L1430 0Z"
        fill="var(--pattern-accent)"
        opacity="0.22"
      />

      <path
        d="M85 430H1180"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="6 12"
        opacity="0.08"
      />
    </svg>
  );
}