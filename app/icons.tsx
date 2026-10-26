import type { ReactNode, SVGProps } from "react";

type IconName = "arrow" | "headphones" | "expand" | "close" | "repeat" | "chevron" | "pin";
const paths: Record<IconName, ReactNode> = {
  arrow: <path d="M7 17 17 7M7 7h10v10" />,
  headphones: <><path d="M4 14v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="12" width="4" height="8" rx="2" /><rect x="17" y="12" width="4" height="8" rx="2" /></>,
  expand: <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M3 3l6 6m12-6-6 6M3 21l6-6m12 6-6-6" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  repeat: <path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  pin: <><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
};
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
