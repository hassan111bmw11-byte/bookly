"use client";

import { LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

type Props = {
  title: string;
};

export default function DashboardHeader({ title }: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#090b18]/90 px-6 backdrop-blur-xl">
      <button className="flex items-center gap-2 text-sm text-slate-300">
        <LogOut size={18} />
        خروج
      </button>
      <p className="font-bold text-slate-300">{title}</p>
      <ThemeToggle />
    </header>
  );
}
