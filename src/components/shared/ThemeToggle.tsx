"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "@/components/shared/ThemeProvider";

export default function ThemeToggle() {
  const { dark, setDark } = useThemeContext();

  return (
    <button
      onClick={() => setDark((v) => !v)}
      className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 dark:border-white/10"
      aria-label="toggle theme"
    >
      {dark ?
        <Sun size={18} />
      : <Moon size={18} />}
    </button>
  );
}
