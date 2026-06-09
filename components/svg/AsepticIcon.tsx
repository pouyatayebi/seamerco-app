import type { SVGProps } from "react";

export function AsepticIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path d="M20 6h24l5 13v34a5 5 0 0 1-5 5H20a5 5 0 0 1-5-5V19L20 6Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M17 20h30M18 49h28M23 6v14M41 6v14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M24 32h16M24 40h16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 26v20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}