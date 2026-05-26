import { Settings } from "lucide-react";

export default function DashboardHero() {
  return (
    <section className="rounded-[2rem] bg-gradient-to-l from-cyan-400 to-indigo-400 p-8 text-white">
      <div className="flex items-center justify-between">
        <div>
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold">لوحة المعلم</span>
          <h1 className="mt-5 text-4xl font-black">إدارة المنصة</h1>
          <p className="mt-2 opacity-90">كل أدواتك لإدارة الطلاب والمحتوى في مكان واحد.</p>
        </div>
        <div className="grid h-16 w-16 place-items-center rounded-full bg-white/20">
          <Settings />
        </div>
      </div>
    </section>
  );
}
