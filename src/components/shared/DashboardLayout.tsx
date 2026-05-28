"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import FloatingWhatsapp from "./FloatingWhatsapp";
import type { NavItem } from "@/data/platform";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { teacherNavItems, studentNavItems } from "@/data/platform";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  role?: "teacher" | "student";
  children: ReactNode;
  items?: NavItem[];
};

export default function DashboardLayout({
  title,
  role,
  children,
  items,
}: Props) {
  const resolvedRole =
    role ?? (items?.[0]?.href?.startsWith("/teacher/") ? "teacher" : "student");

  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const navItems =
    resolvedRole === "teacher" ? teacherNavItems : studentNavItems;

  const router = useRouter();

  // Protect dashboard routes: redirect to login if no active session
  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const res = await fetch("/api/auth/me");
        if (!mounted) return;
        const data = await res.json();
        if (!res.ok || !data?.user) {
          router.replace("/login");
        }
      } catch (e) {
        if (!mounted) return;
        router.replace("/login");
      }
    }
    check();
    return () => {
      mounted = false;
    };
  }, [router]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setShowMobileSidebar(false);
    }
    if (showMobileSidebar) {
      window.addEventListener("keydown", onKey);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [showMobileSidebar]);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#070914] dark:text-white"
    >
      <DashboardSidebar role={resolvedRole} />

      {/* Mobile sidebar overlay */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowMobileSidebar(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-72 border-l border-white/10 bg-[#090b18] p-4">
            <div className="flex items-center justify-between">
              <div />
              <button
                aria-label="إغلاق"
                onClick={() => setShowMobileSidebar(false)}
                className="text-slate-300"
              >
                <X />
              </button>
            </div>

            <nav className="mt-6 space-y-2 overflow-y-auto">
              {navItems.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setShowMobileSidebar(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/10",
                  )}
                >
                  <Icon size={18} />
                  {label}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <section className="min-h-screen lg:mr-72">
        <DashboardHeader
          title={title}
          onToggleSidebar={() => setShowMobileSidebar(true)}
        />
        <div className="p-5 md:p-8">{children}</div>
      </section>

      <FloatingWhatsapp />
    </main>
  );
}
