import type { SVGProps } from "react";

type ProjectsIndustrialPatternProps = SVGProps<SVGSVGElement> & {
  accentOpacity?: number;
  shapeOpacity?: number;
  lineOpacity?: number;
  dotOpacity?: number;
};

export function ProjectsIndustrialPattern({
  accentOpacity = 0.5,
  shapeOpacity = 0.14,
  lineOpacity = 0.08,
  dotOpacity = 0.16,
  ...props
}: ProjectsIndustrialPatternProps) {
  return (
    <svg
      viewBox="0 0 1600 900"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M0 160H1600"
        stroke="currentColor"
        strokeWidth="1"
        opacity={lineOpacity}
      />
      <path
        d="M0 540H1600"
        stroke="currentColor"
        strokeWidth="1"
        opacity={lineOpacity}
      />

      <g opacity={shapeOpacity}>
        <polygon points="150,150 225,150 225,225" fill="currentColor" />
        <polygon points="255,95 360,200 255,200" fill="currentColor" />
        <polygon points="350,245 455,245 350,350" fill="currentColor" />
        <polygon points="1165,585 1260,585 1260,680" fill="currentColor" />
        <polygon points="1290,525 1380,615 1290,615" fill="currentColor" />
        <polygon points="1370,690 1450,690 1370,770" fill="currentColor" />
      </g>

      {/* Brand accent - top right */}
      <polygon
        points="1320,0 1428,0 1374,58"
        fill="var(--pattern-accent, currentColor)"
        opacity={accentOpacity}
      />

      <polygon
        points="1438,42 1482,42 1460,66"
        fill="var(--pattern-accent, currentColor)"
        opacity={accentOpacity * 0.7}
      />

      {/* Brand accent - bottom left */}
      <polygon
        points="0,758 88,812 0,866"
        fill="var(--pattern-accent, currentColor)"
        opacity={accentOpacity * 0.86}
      />

      <polygon
        points="102,710 152,740 102,770"
        fill="var(--pattern-accent, currentColor)"
        opacity={accentOpacity * 0.45}
      />

      <path
        d="M190 430H1320"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="7 14"
        opacity={lineOpacity}
      />

      <circle cx="260" cy="520" r="2" fill="currentColor" opacity={dotOpacity} />
      <circle cx="980" cy="250" r="2" fill="currentColor" opacity={dotOpacity} />
      <circle cx="1380" cy="420" r="2" fill="currentColor" opacity={dotOpacity} />
    </svg>
  );
}