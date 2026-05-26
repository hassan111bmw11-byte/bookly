"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useMemo } from "react";
import { teacherNavItems, studentNavItems } from "@/data/platform";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

type Props = {
  role: "teacher" | "student";
};

function DashboardSidebar({ role }: Props) {
  const pathname = usePathname();

  const items = useMemo(() => {
    return role === "teacher" ? teacherNavItems : studentNavItems;
  }, [role]);

  return (
    <aside className="fixed bottom-0 right-0 top-0 hidden w-72 border-l border-white/10 bg-[#090b18] p-4 lg:block">
      <Logo />

      <nav className="mt-8 space-y-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              prefetch={false}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition",
                active
                  ? "bg-gradient-to-l from-cyan-400 to-indigo-500 text-white"
                  : "text-slate-300 hover:bg-white/10"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default memo(DashboardSidebar);