import type { SVGProps } from "react";

type AdditionalContentPatternProps = SVGProps<SVGSVGElement> & {
  cornerOpacity?: number;
  triangleOpacity?: number;
};

export function AdditionalContentPattern({
  cornerOpacity = 0.08,
  triangleOpacity = 0.18,
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
      <g fill="var(--pattern-accent, var(--primary))">
        {/* top-left soft corner */}
        <path
          d="M0 0H110C110 68 68 110 0 110V0Z"
          opacity={cornerOpacity}
        />

        {/* top-left triangle cluster */}
        <path d="M46 96H76L46 126V96Z" opacity={triangleOpacity} />
        <path d="M82 72H112L82 102V72Z" opacity={triangleOpacity * 0.75} />
        <path d="M112 118H138L112 144V118Z" opacity={triangleOpacity * 0.55} />

        {/* bottom-right soft corner */}
        <path
          d="M1200 760H1090C1090 692 1132 650 1200 650V760Z"
          opacity={cornerOpacity}
        />

        {/* bottom-right triangle cluster */}
        <path d="M1154 664H1124L1154 634V664Z" opacity={triangleOpacity} />
        <path d="M1118 688H1088L1118 658V688Z" opacity={triangleOpacity * 0.75} />
        <path d="M1088 642H1062L1088 616V642Z" opacity={triangleOpacity * 0.55} />
      </g>
    </svg>
  );
}