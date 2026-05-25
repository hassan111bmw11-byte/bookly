import { PlayCircle, Sparkles } from "lucide-react";
import TeacherAvatar from "./TeacherAvatar";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.16),transparent_35%)]" />

      <div className="mx-auto max-w-6xl text-center">
        <TeacherAvatar />

        <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-bold dark:border-white/10 dark:bg-white/5">
          <Sparkles size={16} className="text-indigo-400" />
          منصة فيزياء 3 ثانوي — شرح مبسط بدون تعقيد
        </div>

        <h2 className="mt-6 text-5xl font-black md:text-7xl">
          فهمني{" "}
          <span className="bg-linear-to-l from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            من غير صداع
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
          منصة تعليمية احترافية للفيزياء للصف الثالث الثانوي.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#subscription"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-cyan-400 to-indigo-500 px-7 py-4 font-black text-white"
          >
            ابدأ الآن مجانًا
            <PlayCircle size={20} />
          </a>

          <a className="rounded-2xl border px-7 py-4 font-bold dark:border-white/10">
            تسجيل الدخول
          </a>
        </div>
      </div>
    </section>
  );
}