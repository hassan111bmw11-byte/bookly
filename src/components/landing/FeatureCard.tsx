import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  desc: string;
  icon: LucideIcon;
};

export default function FeatureCard({ title, desc, icon: Icon }: Props) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-white">
        <Icon size={25} />
      </div>

      <h3 className="mt-7 text-xl font-black">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
        {desc}
      </p>
    </article>
  );
}