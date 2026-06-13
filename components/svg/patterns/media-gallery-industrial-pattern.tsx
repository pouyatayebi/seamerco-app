import type { SVGProps } from "react";

type MediaGalleryIndustrialPatternProps = SVGProps<SVGSVGElement> & {
  accentOpacity?: number;
  shapeOpacity?: number;
  lineOpacity?: number;
};

export function MediaGalleryIndustrialPattern({
  accentOpacity = 0.22,
  shapeOpacity = 0.12,
  lineOpacity = 0.08,
  ...props
}: MediaGalleryIndustrialPatternProps) {
  return (
    <svg viewBox="0 0 1440 720" fill="none" aria-hidden="true" {...props}>
      <g opacity={shapeOpacity}>
        <path d="M110 120H190V200L110 120Z" fill="currentColor" />
        <path d="M250 70H370V190L250 70Z" fill="currentColor" />
        <path d="M340 230H455L340 345V230Z" fill="currentColor" />
        <path d="M1080 470H1190L1080 580V470Z" fill="currentColor" />
        <path d="M1220 420H1310V510L1220 420Z" fill="currentColor" />
      </g>

      <path
        d="M1290 0L1365 75L1440 0H1290Z"
        fill="var(--pattern-accent, currentColor)"
        opacity={accentOpacity}
      />

      <path
        d="M0 600L95 660L0 720V600Z"
        fill="var(--pattern-accent, currentColor)"
        opacity={accentOpacity * 0.8}
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