import { Search } from "lucide-react";

type Props = {
  placeholder?: string;
};

export default function SearchInput({ placeholder = "بحث..." }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 dark:border-white/10">
      <Search size={18} className="text-slate-400" />
      <input className="w-full bg-transparent outline-none" placeholder={placeholder} />
    </div>
  );
}
