import { GraduationCap, Moon, Sun } from "lucide-react";

type Props = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ dark, setDark }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#070914]/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-white">
            <GraduationCap size={21} />
          </div>

          <div>
            <h1 className="font-black">فهمني</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              من غير صداع
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300 md:flex">
          <a href="#features">المميزات</a>
          <a href="#subscription">الاشتراك</a>
          <a href="#contact">التواصل</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 dark:border-white/10"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a className="rounded-xl border px-5 py-2.5 text-sm font-bold dark:border-white/10">
            دخول
          </a>

          <a
            href="#subscription"
            className="rounded-xl bg-gradient-to-l from-cyan-400 to-indigo-500 px-5 py-2.5 text-sm font-black text-white"
          >
            سجل الآن
          </a>
        </div>
      </nav>
    </header>
  );
}