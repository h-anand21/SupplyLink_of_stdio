import type { SVGProps } from "react";

export function VendorLinkLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 18.571h-1.5c-2.485 0-4.5-2.015-4.5-4.5v-4.071c0-2.486 2.015-4.5 4.5-4.5h1.5" />
      <path d="M13 5.429h1.5c2.485 0 4.5 2.015 4.5 4.5v4.071c0 2.486-2.015 4.5-4.5 4.5h-1.5" />
      <path d="M12 2v20" />
      <path d="m5 12 1.58-.632a2 2 0 0 1 1.664 0l1.512.605a2 2 0 0 0 1.664 0l1.512-.605a2 2 0 0 1 1.664 0L19 12" />
    </svg>
  );
}
