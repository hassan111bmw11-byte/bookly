import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  desc?: string;
};

export default function EmptyState({ icon: Icon, title, desc }: Props) {
  return (
    <div className="grid min-h-64 place-items-center rounded-3xl border border-dashed border-slate-200 text-center dark:border-white/10">
      <div>
        <Icon className="mx-auto text-slate-400" size={44} />
        <h3 className="mt-3 font-black">{title}</h3>
        {desc && <p className="mt-2 text-sm text-slate-500">{desc}</p>}
      </div>
    </div>
  );
}
