import { features } from "@/data/landing";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section id="features" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-black md:text-4xl">
            كل اللي محتاجه في مكان واحد
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            منصة متكاملة مصممة خصيصًا لمنهج الفيزياء
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}