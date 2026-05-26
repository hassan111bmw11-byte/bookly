import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import TeacherAvatar from "./TeacherAvatar";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative overflow-hidden px-5 py-20 md:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.16),transparent_35%)]" />
      <div className="mx-auto max-w-6xl text-center">
        <TeacherAvatar />

        <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-bold text-slate-800 dark:border-white/10 dark:bg-white/10 dark:text-white">
          <Sparkles size={16} className="text-indigo-400" />
          منصة فيزياء 3 ثانوي — شرح مبسط بدون تعقيد
        </div>

        <h2 className="mt-6 text-5xl font-black leading-tight md:text-7xl">
          فهمني{" "}
          <span className="bg-gradient-to-l from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            من غير صداع
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
          منصة تعليمية احترافية للفيزياء للصف الثالث الثانوي.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
            <Link href="/register">
              <Button className="gap-2">
                ابدأ الآن مجانًا
                <PlayCircle size={20} />
              </Button>
            </Link>
          </motion.div>
          <motion.a
            whileHover={{ y: -3 }}
            href="/login"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/90 px-7 py-4 font-bold text-slate-900 shadow-sm transition hover:border-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            تسجيل الدخول
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}
