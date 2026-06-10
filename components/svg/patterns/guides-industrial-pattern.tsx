import type { SVGProps } from "react";

export function GuidesIndustrialPattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 1440 520" fill="none" aria-hidden="true" {...props}>
      <g opacity="0.14">
        <path d="M108 90H178L178 160L108 90Z" fill="currentColor" />
        <path d="M214 154H292L214 232V154Z" fill="currentColor" />
        <path d="M340 78H460L460 198L340 78Z" fill="currentColor" />
      </g>

      <g opacity="0.1">
        <path d="M1050 330H1148L1050 428V330Z" fill="currentColor" />
        <path d="M1182 280H1260L1260 358L1182 280Z" fill="currentColor" />
        <path d="M1278 388H1352L1278 462V388Z" fill="currentColor" />
      </g>

      <path
        d="M1260 0L1330 70L1400 0Z"
        fill="var(--pattern-accent)"
        opacity="0.18"
      />

      <path
        d="M0 410L90 465L0 520V410Z"
        fill="var(--pattern-accent)"
        opacity="0.14"
      />

      <path
        d="M180 258H1260"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="8 14"
        opacity="0.08"
      />
    </svg>
  );
}