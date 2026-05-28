"use client";

import { LogOut, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  title: string;
  onToggleSidebar?: () => void;
};

export default function DashboardHeader({ title, onToggleSidebar }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
      router.replace("/login");
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#090b18]/90 px-4 md:px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          aria-label="قائمة"
          className="lg:hidden text-slate-300"
        >
          <Menu size={20} />
        </button>
        <button
          onClick={handleLogout}
          disabled={loading}
          aria-label="تسجيل خروج"
          className="hidden sm:flex items-center gap-2 text-sm text-slate-300 disabled:opacity-50"
        >
          <LogOut size={18} />
          خروج
        </button>
      </div>

      <p className="font-bold text-slate-300">{title}</p>

      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}
