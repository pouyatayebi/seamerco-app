import type { SVGProps } from "react";

type ContentOverviewIndustrialPatternProps = SVGProps<SVGSVGElement> & {
  accentOpacity?: number;
  shapeOpacity?: number;
  lineOpacity?: number;
};

export function ContentOverviewIndustrialPattern({
  accentOpacity = 0.26,
  shapeOpacity = 0.12,
  lineOpacity = 0.08,
  ...props
}: ContentOverviewIndustrialPatternProps) {
  return (
    <svg viewBox="0 0 1440 720" fill="none" aria-hidden="true" {...props}>
      <g opacity={shapeOpacity}>
        <path d="M110 120H185V195L110 120Z" fill="currentColor" />
        <path d="M250 70H365V185L250 70Z" fill="currentColor" />
        <path d="M1060 470H1175L1060 585V470Z" fill="currentColor" />
        <path d="M1215 420H1300V505L1215 420Z" fill="currentColor" />
      </g>

      <path
        d="M1288 0L1364 76L1440 0H1288Z"
        fill="var(--pattern-accent, currentColor)"
        opacity={accentOpacity}
      />

      <path
        d="M0 600L92 660L0 720V600Z"
        fill="var(--pattern-accent, currentColor)"
        opacity={accentOpacity * 0.8}
      />

      <path
        d="M170 360H1270"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="8 14"
        opacity={lineOpacity}
      />
    </svg>
  );
}