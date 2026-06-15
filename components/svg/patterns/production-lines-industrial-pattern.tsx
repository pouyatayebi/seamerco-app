import type { SVGProps } from "react";

export function ProductionLinesIndustrialPattern(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 1440 720"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      {...props}
    >
      {/* بالا چپ - نارنجی */}
      <path
        d="M0 0H36L0 36V0Z"
        fill="var(--primary)"
      />

      {/* بالا راست - سرمه‌ای */}
      <path
        d="M1440 0H1404L1440 36V0Z"
        fill="var(--secondary)"
      />

      {/* پایین چپ - سرمه‌ای */}
      <path
        d="M0 720H36L0 684V720Z"
        fill="var(--secondary)"
      />

      {/* پایین راست - نارنجی */}
      <path
        d="M1440 720H1404L1440 684V720Z"
        fill="var(--primary)"
      />
    </svg>
  );
}