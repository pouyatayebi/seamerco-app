// components/svg/industrial-triangle-pattern.tsx

import type { SVGProps } from "react";

export function IndustrialTrianglePattern(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 1440 720"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      {/* Top Left Pattern */}
      <g opacity="0.16">
        <path d="M112 132H178L178 198L112 132Z" fill="currentColor" />
        <path d="M236 72H338L338 174L236 72Z" fill="currentColor" />
        <path d="M310 178H416L310 284V178Z" fill="currentColor" />
        <path d="M438 136H520L520 218L438 136Z" fill="currentColor" />
        <path d="M522 230H570L522 278V230Z" fill="currentColor" />
      </g>

      {/* Bottom Right Pattern */}
      <g opacity="0.12">
        <path d="M1038 476H1136L1038 574V476Z" fill="currentColor" />
        <path d="M1158 432H1228L1228 502L1158 432Z" fill="currentColor" />
        <path d="M1198 542H1272L1198 616V542Z" fill="currentColor" />
        <path d="M1288 484H1360L1360 556L1288 484Z" fill="currentColor" />
      </g>

      {/* Small decorative */}
      <path
        d="M1388 82H1424L1424 118L1388 82Z"
        fill="currentColor"
        opacity="0.08"
      />

      {/* Brand Accent Top */}
      <path
        d="M1280 0L1345 65L1410 0Z"
        fill="var(--pattern-accent)"
        opacity="0.82"
      />

      <path
        d="M1365 38L1395 68L1425 38Z"
        fill="currentColor"
        opacity="0.10"
      />

      {/* Brand Accent Bottom */}
      <path
        d="M0 640L70 680L0 720Z"
        fill="var(--pattern-accent)"
        opacity="0.72"
      />

      <path
        d="M80 600L120 640L80 680Z"
        fill="currentColor"
        opacity="0.08"
      />
    </svg>
  );
}