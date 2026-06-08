// components/svg/proforma-invoice-icon.tsx

type ProformaInvoiceIconProps = {
  className?: string;
};

export function ProformaInvoiceIcon({ className }: ProformaInvoiceIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6.5 3.75h11v16.5l-2-1.25-2 1.25-2-1.25-2 1.25-3-1.75V3.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 8h6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M9 11.25h6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M9 14.5h3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}