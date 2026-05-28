"use client";

import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { useEffect, useState } from "react";
import {
  Video,
  ClipboardCheck,
  FileText,
  BookOpen,
  GraduationCap,
  Bot,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  lectures: Video,
  exams: ClipboardCheck,
  files: FileText,
  assignments: BookOpen,
  community: GraduationCap,
  assistant: Bot,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
};

export default function Features() {
  const [features, setFeatures] = useState<any[] | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/landing/summary");
        const data = await res.json();
        if (!mounted) return;
        if (res.ok) setFeatures(data.features || []);
      } catch (e) {
        console.error(e);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="features" className="px-5 py-20 bg-slate-50 dark:bg-[#03040f]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-black md:text-4xl">
            كل اللي محتاجه في مكان واحد
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            منصة متكاملة مصممة خصيصًا لمنهج الفيزياء
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {(features || []).map((feature: any) => {
            const Icon = ICON_MAP[feature.key] || Video;
            return (
              <FeatureCard
                key={feature.key}
                title={feature.title}
                desc={feature.desc}
                icon={Icon}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
