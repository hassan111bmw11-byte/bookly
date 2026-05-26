"use client";

import Logo from "@/components/shared/Logo";
import ThemeToggle from "@/components/shared/ThemeToggle";

type Props = {
  title: string;
  subtitle: string;
  sideTitle: string;
  sideSubtitle: string;
  children: React.ReactNode;
};

export default function AuthShell({
  title,
  subtitle,
  sideTitle,
  sideSubtitle,
  children,
}: Props) {
  return (
    <main
      className="min-h-screen bg-white text-slate-950 dark:bg-[#070914] dark:text-white"
      dir="rtl"
    >
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative flex items-center justify-center p-6">
          <div className="absolute left-6 top-6">
            <ThemeToggle />
          </div>
          <div className="w-full max-w-lg">
            <h1 className="text-4xl font-black">{title}</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
            <div className="mt-10">{children}</div>
          </div>
        </section>

        <section className="hidden bg-gradient-to-br from-indigo-400 to-cyan-400 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <Logo />
          <div>
            <h2 className="text-5xl font-black">{sideTitle}</h2>
            <p className="mt-5 text-xl opacity-90">{sideSubtitle}</p>
          </div>
          <p>© فهمني — فيزياء ثالثة ثانوي</p>
        </section>
      </div>
    </main>
  );
}
