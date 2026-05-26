import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({
  placeholder = "بحث...",
  value,
  onChange,
}: Props) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 dark:border-white/10">
      <Search size={18} className="text-slate-400" />
      <input
        className="w-full bg-transparent outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
