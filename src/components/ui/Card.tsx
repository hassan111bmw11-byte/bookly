import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-none",
        className
      )}
      {...props}
    />
  );
}
