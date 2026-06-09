import type { SVGProps } from "react";

export function CannedBeansLineIcon(
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
      {/* قوطی حبوبات */}
      <rect
        x={11}
        y={6}
        width={18}
        height={26}
        rx={4}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      {/* رینگ بالا */}
      <rect
        x={13}
        y={8}
        width={14}
        height={3}
        rx={1.2}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
      />
      {/* لوبیاها */}
      <path
        d="M16 18c-1.1.4-1.8 1.2-1.8 2.1 0 1.3 1.1 2.3 2.7 2.3 0.6 0 1.1-.1 1.6-.4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      <path
        d="M21 19.5c.7-.4 1.3-.6 2-.6 1.4 0 2.5.8 2.5 2.2 0 1-.7 1.9-1.8 2.3"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
      />
    </svg>
  );
}
