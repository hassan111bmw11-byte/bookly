import type { HTMLAttributes, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export default function Card(props: HTMLAttributes<HTMLDivElement>) {
  const { className, onClick, ...rest } = props;
  const isClickable = typeof onClick === "function";

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isClickable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      onClick={onClick}
      className={cn(
        "rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-none",
        className,
        isClickable ? "cursor-pointer" : "",
      )}
      {...rest}
    />
  );
}
