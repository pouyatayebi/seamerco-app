import type { SVGProps } from "react";

type TechnicalSpecsCornerPatternProps = SVGProps<SVGSVGElement> & {
  opacity?: number;
};

export function TechnicalSpecsCornerPattern({
  opacity = 1,
  ...props
}: TechnicalSpecsCornerPatternProps) {
  return (
    <svg
      viewBox="0 0 1440 520"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      {...props}
    >
      <g fill="var(--primary)" opacity={opacity}>
        {/* top right - smaller */}
        <path d="M1440 0H1348L1440 92V0Z" />
        <path d="M1372 0H1322L1372 50V0Z" opacity="0.55" />
        <path d="M1440 112L1388 60H1440V112Z" opacity="0.72" />

        {/* bottom left - smaller */}
        <path d="M0 520H92L0 428V520Z" />
        <path d="M0 452L50 502H0V452Z" opacity="0.55" />
        <path d="M112 520L60 468V520H112Z" opacity="0.72" />
      </g>
    </svg>
  );
}