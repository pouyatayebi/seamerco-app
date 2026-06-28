import type { SVGProps } from "react";

export function TomatoBulkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* مخزن فله */}
      <path d="M7 4h10v4l-1.5 2v7a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-7L7 8V4z" />

      {/* گوجه */}
      <circle cx="12" cy="13" r="2.2" />
      <path d="M12 10.5l1-1" />
      <path d="M12 10.5l-1-1" />
      <path d="M12 10.5v-1.2" />
    </svg>
  );
}