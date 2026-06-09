import type { SVGProps } from "react";

export function SachetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path d="M22 6h20v15l5 16v13c0 5.5-4.5 10-10 10H27c-5.5 0-10-4.5-10-10V37l5-16V6Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M22 18h20M20 38c5 2 7-3 12 0s7-2 12 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M27 6v12M37 6v12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 47h.1" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}