import { Ticket } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import StatCard from "@/components/ui/StatCard";

const codes = ["WBLXN82C7MTX", "ZS5Y2NEFQ8PV", "QFNNR38X4Q43"];

export default function ChargeCodesPanel() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="أكواد نشطة" value="20" icon={Ticket} color="from-emerald-500 to-teal-400" />
        <StatCard label="مستخدمة" value="0" icon={Ticket} color="from-cyan-500 to-blue-500" />
        <StatCard label="ملغاة" value="0" icon={Ticket} color="from-rose-500 to-red-500" />
        <StatCard label="إجمالي قيمة الشحن" value="0 ج" icon={Ticket} color="from-orange-500 to-amber-400" />
      </div>

      <Card>
        <h2 className="mb-5 text-xl font-black">توليد أكواد جديدة</h2>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_220px]">
          <Input label="قيمة الكود" type="number" defaultValue={100} />
          <Input label="عدد الأكواد" type="number" defaultValue={10} />
          <Button>توليد</Button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-5 text-xl font-black">قائمة الأكواد</h2>
        <div className="space-y-3">
          {codes.map((code) => (
            <div key={code} className="flex items-center justify-between rounded-2xl border border-white/10 p-4">
              <code className="font-black">{code}</code>
              <span className="text-sm text-slate-400">100 ج — نشط</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
