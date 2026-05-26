import { GraduationCap } from "lucide-react";

export default function TeacherAvatar() {
  return (
    <div className="mx-auto h-48 w-48 rounded-full bg-gradient-to-br from-cyan-300 via-white to-indigo-400 p-1 shadow-2xl shadow-cyan-500/20">
      <div className="grid h-full w-full place-items-center rounded-full bg-[#0b1020]">
        <div className="grid h-40 w-40 place-items-center rounded-full bg-gradient-to-br from-slate-700 to-slate-950 text-center text-white">
          <div>
            <GraduationCap className="mx-auto mb-2 text-cyan-300" size={42} />
            <p className="font-black">الأستاذ أحمد</p>
            <p className="text-xs text-slate-400">Physics Teacher</p>
          </div>
        </div>
      </div>
    </div>
  );
}
