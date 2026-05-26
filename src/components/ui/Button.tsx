import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "gradient" | "outline" | "ghost" | "success";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  gradient: "bg-gradient-to-l from-cyan-400 to-indigo-500 text-white shadow-lg shadow-cyan-500/20",
  outline: "border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10",
  ghost: "hover:bg-slate-100 dark:hover:bg-white/10",
  success: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20",
};

export default function Button({
  className,
  variant = "gradient",
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black transition duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
