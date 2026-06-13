import type { SVGProps } from "react";

type AdditionalContentPatternProps = SVGProps<SVGSVGElement> & {
  opacity?: number;
};

export function AdditionalContentPattern({
  opacity = 0.1,
  ...props
}: AdditionalContentPatternProps) {
  return (
    <svg
      viewBox="0 0 1200 760"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      {...props}
    >
      <g fill="var(--pattern-accent, var(--primary))" opacity={opacity}>
        {/* top-left */}
        <polygon points="0,0 118,0 0,118" />

        <polygon points="150,0 198,0 150,48" opacity="0.52" />

        <polygon points="0,150 48,150 0,198" opacity="0.52" />

        {/* bottom-right */}
        <polygon points="1200,760 1082,760 1200,642" />

        <polygon points="1050,760 1002,760 1050,712" opacity="0.52" />

        <polygon points="1200,610 1152,610 1200,562" opacity="0.52" />
      </g>
    </svg>
  );
}