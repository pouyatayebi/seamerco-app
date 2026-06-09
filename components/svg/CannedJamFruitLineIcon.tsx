import type { SVGProps } from "react";

export function CannedJamFruitLineIcon(
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
      {/* شیشه مربا */}
      <rect
        x={11}
        y={8}
        width={18}
        height={24}
        rx={4}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      {/* در شیشه */}
      <rect
        x={12.5}
        y={6}
        width={15}
        height={3}
        rx={1.2}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
      />
      {/* تکه‌های میوه داخل شیشه */}
      <circle cx={16} cy={18} r={1.4} fill="currentColor" />
      <circle cx={22} cy={20.5} r={1.4} fill="currentColor" />
      <circle cx={19} cy={23} r={1.1} fill="currentColor" />
    </svg>
  );
}
