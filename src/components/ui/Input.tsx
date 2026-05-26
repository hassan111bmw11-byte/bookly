import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, className, ...props }: Props) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-bold">{label}</span>}
      <input
        className={cn(
          "w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none transition focus:border-cyan-400 dark:border-white/10",
          className
        )}
        {...props}
      />
    </label>
  );
}
