import { motion } from "framer-motion";
import { CheckCircle2, Phone } from "lucide-react";
import { CASH_PHONE } from "@/data/platform";
import Card from "@/components/ui/Card";

export default function Subscription() {
  const steps = [
    "سجل حسابك داخل المنصة.",
    "حوّل قيمة الاشتراك على رقم فودافون كاش.",
    "أرسل صورة التحويل + اسمك على الواتساب.",
    "يتم تفعيل اشتراكك خلال دقائق.",
  ];

  return (
    <section id="subscription" className="bg-gradient-to-br from-slate-100 via-cyan-50 to-slate-100 px-5 py-24 dark:from-[#10152b] dark:via-[#052f34] dark:to-[#080914]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className="mx-auto max-w-4xl p-8 md:p-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-bold text-indigo-500">
            <Phone size={16} />
            الاشتراك والدفع
          </div>

          <h2 className="text-3xl font-black">خطوات الاشتراك</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <PaymentBox label="رقم فودافون كاش" value={CASH_PHONE} />
            <PaymentBox label="رقم الواتساب" value={CASH_PHONE} />
          </div>

          <ul className="mt-8 space-y-4">
            {steps.map((step) => (
              <li key={step} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="mt-1 text-emerald-400" size={20} />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </section>
  );
}

function PaymentBox({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition dark:border-white/10 dark:bg-black/25"
    >
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">+20{value.slice(1)}</p>
    </motion.div>
  );
}
