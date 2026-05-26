import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export default function Textarea({ label, className, ...props }: Props) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-bold">{label}</span>}
      <textarea
        className={cn(
          "min-h-24 w-full resize-none rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none transition focus:border-cyan-400 dark:border-white/10",
          className
        )}
        {...props}
      />
    </label>
  );
}
