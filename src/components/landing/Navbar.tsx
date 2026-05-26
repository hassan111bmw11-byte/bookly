"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Logo from "@/components/shared/Logo";
import Button from "@/components/ui/Button";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#070914]/90"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Logo />

        <div className="hidden items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300 md:flex">
          <a
            href="#features"
            className="transition hover:text-slate-900 dark:hover:text-white"
          >
            المميزات
          </a>
          <a
            href="#subscription"
            className="transition hover:text-slate-900 dark:hover:text-white"
          >
            الاشتراك
          </a>
          <a
            href="#contact"
            className="transition hover:text-slate-900 dark:hover:text-white"
          >
            التواصل
          </a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:border-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-white sm:inline-flex"
          >
            دخول
          </Link>
          <Link href="/register">
            <Button className="px-5 py-2.5">سجل الآن</Button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
