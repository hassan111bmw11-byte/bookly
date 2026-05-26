import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

type Props = {
  title: string;
  desc: string;
  icon: LucideIcon;
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function FeatureCard({ title, desc, icon: Icon }: Props) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 16 }}
    >
      <Card className="group cursor-pointer overflow-hidden bg-white/95 shadow-lg shadow-slate-200/40 transition dark:bg-white/5 dark:shadow-none">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-white shadow-lg shadow-cyan-500/20">
          <Icon size={25} />
        </div>
        <h3 className="mt-7 text-xl font-black text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{desc}</p>
      </Card>
    </motion.div>
  );
}
