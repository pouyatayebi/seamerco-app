import type { SVGProps } from "react";

export function CannedTunaLineIcon(
  props: SVGProps<SVGSVGElement>
) {
  const { className, ...rest } = props;
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {/* قوطی افقی */}
      <rect
        x={6}
        y={15}
        width={28}
        height={10}
        rx={5}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      {/* فیله ماهی داخل قوطی */}
      <path
        d="M8.5 20c3-2 6-3 11-3s8 1 11 3"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* چشم ماهی روی یکی از فیله‌ها */}
      <circle cx={19} cy={19.5} r={0.9} fill="currentColor" />
    </svg>
  );
}
