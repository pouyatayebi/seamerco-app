import type { SVGProps } from "react";

export function CanIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="4.4" y="1.5" width="15.2" height="21" rx="1.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2.6 1.5h18.8M2.6 22.5h18.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="4.4" y="6.3" width="15.2" height="11.4" stroke="currentColor" strokeWidth="1.7" />
      <ellipse cx="12" cy="12" rx="3.8" ry="1.9" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}