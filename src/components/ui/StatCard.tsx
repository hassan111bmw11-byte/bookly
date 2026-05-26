import type { LucideIcon } from "lucide-react";
import Card from "./Card";

type Props = {
  label: string;
  value: string;
  icon: LucideIcon;
  color?: string;
};

export default function StatCard({ label, value, icon: Icon, color = "from-cyan-400 to-indigo-500" }: Props) {
  return (
    <Card className="min-h-32">
      <div className="flex items-center justify-between">
        <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${color} text-white`}>
          <Icon size={22} />
        </div>
        <span className="text-xs text-slate-500">إحصائية</span>
      </div>
      <p className="mt-5 text-3xl font-black">{value}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </Card>
  );
}
