import { motion } from "framer-motion";
import { landingFeatures } from "@/data/platform";
import FeatureCard from "./FeatureCard";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
};

export default function Features() {
  return (
    <section id="features" className="px-5 py-20 bg-slate-50 dark:bg-[#03040f]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-black md:text-4xl">كل اللي محتاجه في مكان واحد</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">منصة متكاملة مصممة خصيصًا لمنهج الفيزياء</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {landingFeatures.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
