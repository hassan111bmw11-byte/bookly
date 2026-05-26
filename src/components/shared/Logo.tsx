import { GraduationCap } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-white">
        <GraduationCap size={22} />
      </div>
      <div>
        <p className="font-black leading-none">فهمني</p>
        <p className="text-xs text-slate-500">من غير صداع</p>
      </div>
    </div>
  );
}
