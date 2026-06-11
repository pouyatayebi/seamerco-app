import type { SVGProps } from "react";

type LineAdvisorIndustrialPatternProps = SVGProps<SVGSVGElement> & {
  accentOpacity?: number;
  shapeOpacity?: number;
  lineOpacity?: number;
};

export function LineAdvisorIndustrialPattern({
  accentOpacity = 0.28,
  shapeOpacity = 0.12,
  lineOpacity = 0.08,
  ...props
}: LineAdvisorIndustrialPatternProps) {
  return (
    <svg viewBox="0 0 1440 720" fill="none" aria-hidden="true" {...props}>
      <g opacity={shapeOpacity}>
        <path d="M122 120H198V196L122 120Z" fill="currentColor" />
        <path d="M260 64H372V176L260 64Z" fill="currentColor" />
        <path d="M340 220H452L340 332V220Z" fill="currentColor" />
        <path d="M1030 480H1138L1030 588V480Z" fill="currentColor" />
        <path d="M1180 420H1270V510L1180 420Z" fill="currentColor" />
      </g>

      <path
        d="M1280 0L1360 80L1440 0H1280Z"
        fill="var(--pattern-accent, currentColor)"
        opacity={accentOpacity}
      />

      <path
        d="M0 590L90 650L0 710V590Z"
        fill="var(--pattern-accent, currentColor)"
        opacity={accentOpacity * 0.75}
      />

      <path
        d="M180 360H1260"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="8 14"
        opacity={lineOpacity}
      />
    </svg>
  );
}