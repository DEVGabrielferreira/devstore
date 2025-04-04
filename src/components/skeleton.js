import { twMerge } from "tailwind-merge";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={twMerge("bg-zinc-50/10 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}
