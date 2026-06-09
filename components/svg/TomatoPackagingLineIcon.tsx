import type { SVGProps } from "react";

export function TomatoPackagingLineIcon(
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
      {/* کارتن/بسته */}
      <rect
        x={5}
        y={12}
        width={30}
        height={16}
        rx={3}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      {/* بطری رب */}
      <rect
        x={10}
        y={9}
        width={7}
        height={15}
        rx={2}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
      />
      <rect
        x={11.5}
        y={7}
        width={4}
        height={2}
        rx={0.8}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
      />
      {/* گوجه روی لیبل */}
      <circle cx={13.5} cy={16} r={1.5} fill="currentColor" />
      {/* نواری از بسته‌ها سمت راست */}
      <rect
        x={20}
        y={14}
        width={4}
        height={8}
        rx={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
      />
      <rect
        x={26}
        y={14}
        width={4}
        height={8}
        rx={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
      />
    </svg>
  );
}
