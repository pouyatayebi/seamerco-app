import type { SVGProps } from "react";

export function CannedOlivePickledLineIcon(
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
      {/* ظرف شیشه‌ای بزرگ */}
      <rect
        x={9}
        y={8}
        width={22}
        height={24}
        rx={4}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      {/* زیتون‌ها */}
      <ellipse
        cx={16}
        cy={18}
        rx={2}
        ry={3}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
      />
      <circle cx={16} cy={18} r={0.6} fill="currentColor" />
      <ellipse
        cx={24}
        cy={22}
        rx={2}
        ry={3}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
      />
      <circle cx={24} cy={22} r={0.6} fill="currentColor" />
      {/* خط آب نمک */}
      <line
        x1={11}
        y1={24}
        x2={29}
        y2={24}
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </svg>
  );
}
