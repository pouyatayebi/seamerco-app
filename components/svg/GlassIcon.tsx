import type { SVGProps } from "react";

export function GlassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path d="M21 8h22v9l4 5.5A15 15 0 0 1 50 32v13c0 8-5.5 12-18 12S14 53 14 45V32a15 15 0 0 1 3-9.5l4-5.5V8Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M20 8h24M21 17h22M18 34h28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="40" r="8" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}