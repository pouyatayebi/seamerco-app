import type { SVGProps } from "react";

export function TomatoProcessingLineIcon(
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
      {/* بدنه خط تولید */}
      <rect
        x={4}
        y={14}
        width={32}
        height={12}
        rx={3}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      {/* ریل پایین */}
      <line
        x1={6}
        y1={26}
        x2={34}
        y2={26}
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      {/* چند گوجه روی نوار */}
      <circle cx={11} cy={21} r={2} fill="currentColor" />
      <circle cx={19} cy={21} r={2} fill="currentColor" />
      <circle cx={27} cy={21} r={2} fill="currentColor" />
      {/* باکس ورودی سمت چپ */}
      <rect
        x={4}
        y={10}
        width={8}
        height={4}
        rx={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
      />
      {/* خروجی تغلیظ سمت راست */}
      <rect
        x={28}
        y={10}
        width={8}
        height={6}
        rx={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
      />
    </svg>
  );
}
