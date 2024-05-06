import type { SVGProps } from "react";

export default function MinimizeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M20 14H4v-4h16"/>
    </svg>
  );
}