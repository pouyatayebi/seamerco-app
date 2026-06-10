import type { SVGProps } from "react";

export function IndustrialHashFrame(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 520 520" fill="none" aria-hidden="true" {...props}>
      <defs>
        <pattern
          id="industrial-frame-hatch"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect
        x="0"
        y="0"
        width="270"
        height="210"
        rx="24"
        fill="url(#industrial-frame-hatch)"
        opacity="0.7"
      />

      <rect
        x="250"
        y="330"
        width="270"
        height="190"
        rx="24"
        fill="url(#industrial-frame-hatch)"
        opacity="0.45"
      />
    </svg>
  );
}