"use client";

import { useEffect, useState } from "react";
import { Ticket } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import StatCard from "@/components/ui/StatCard";
import { useToast } from "@/components/shared/ToastProvider";

type ChargeCode = {
  id: number;
  code: string;
  amount: number;
  expiresAt: string;
  status: "ACTIVE" | "USED" | "CANCELED";
};

type Stats = {
  total: number;
  unused: number;
  used: number;
  canceled: number;
  totalValue: number;
};

export default function ChargeCodesPanel() {
  const [codes, setCodes] = useState<ChargeCode[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [amount, setAmount] = useState(100);
  const [count, setCount] = useState(20);
  const [loading, setLoading] = useState(false);
  const [codesLoading, setCodesLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<number | null>(null);
  const toast = useToast();

  const fetchCodes = async () => {
    setCodesLoading(true);
    try {
      const res = await fetch("/api/teacher/charge-codes", {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.show(data?.error || "فشل تحميل الأكواد.", "error");
        return;
      }
      setCodes(data.codes || []);
      setStats(data.stats || null);
    } catch (error) {
      console.error(error);
      toast.show("فشل تحميل الأكواد.", "error");
    } finally {
      setCodesLoading(false);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/teacher/charge-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, count }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.show(data?.error || "فشل توليد الأكواد.", "error");
        return;
      }
      toast.show("تم توليد الأكواد بنجاح", "success");
      await fetchCodes();
    } catch (error) {
      console.error(error);
      toast.show("فشل توليد الأكواد.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    setCancelingId(id);
    try {
      const res = await fetch("/api/teacher/charge-codes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "cancel" }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.show(data?.error || "فشل إلغاء الكود.", "error");
        return;
      }
      toast.show("تم إلغاء الكود.", "success");
      await fetchCodes();
    } catch (error) {
      console.error(error);
      toast.show("فشل إلغاء الكود.", "error");
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-5">
        <StatCard
          label="مجموع الأكواد"
          value={stats ? stats.total.toString() : "0"}
          icon={Ticket}
          color="from-violet-500 to-indigo-500"
        />
        <StatCard
          label="غير مستخدمة"
          value={stats ? stats.unused.toString() : "0"}
          icon={Ticket}
          color="from-emerald-500 to-teal-400"
        />
        <StatCard
          label="مستخدمة"
          value={stats ? stats.used.toString() : "0"}
          icon={Ticket}
          color="from-cyan-500 to-blue-500"
        />
        <StatCard
          label="ملغاة"
          value={stats ? stats.canceled.toString() : "0"}
          icon={Ticket}
          color="from-rose-500 to-red-500"
        />
        <StatCard
          label="إجمالي قيمة الشحن"
          value={stats ? `${stats.totalValue} ج` : "0 ج"}
          icon={Ticket}
          color="from-orange-500 to-amber-400"
        />
      </div>

      <Card>
        <h2 className="mb-5 text-xl font-black">توليد أكواد جديدة</h2>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_220px]">
          <Input
            label="قيمة الكود"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Input
            label="عدد الأكواد"
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? "جاري التوليد..." : "توليد"}
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-5 text-xl font-black">قائمة الأكواد</h2>
        <div className="space-y-3">
          {codesLoading ? (
            <>
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 rounded-2xl border border-white/10 p-4 animate-pulse sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-2">
                    <div className="h-6 w-40 rounded-lg bg-slate-200 dark:bg-slate-700" />
                    <div className="h-4 w-32 rounded-lg bg-slate-200 dark:bg-slate-700" />
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="h-4 w-32 rounded-lg bg-slate-200 dark:bg-slate-700" />
                    <div className="h-9 w-24 rounded-lg bg-slate-200 dark:bg-slate-700" />
                  </div>
                </div>
              ))}
              <p className="text-sm text-slate-500">جاري تحميل الأكواد...</p>
            </>
          ) : codes.length > 0 ?
            codes.map((code) => (
              <div
                key={code.id}
                className="flex flex-col gap-2 rounded-2xl border border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <code className="font-black">{code.code}</code>
                  <p className="text-sm text-slate-400">
                    ينتهي في{" "}
                    {new Date(code.expiresAt).toLocaleDateString("ar-EG")}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-slate-400">
                    {code.amount} ج —
                    {code.status === "ACTIVE" ?
                      <span className="font-semibold text-emerald-500">
                        {" "}
                        نشط
                      </span>
                    : code.status === "USED" ?
                      <span className="font-semibold text-cyan-500">
                        {" "}
                        مستخدم
                      </span>
                    : <span className="font-semibold text-rose-500"> ملغى</span>
                    }
                  </span>
                  {code.status === "ACTIVE" ?
                    <Button
                      variant="outline"
                      onClick={() => handleCancel(code.id)}
                      disabled={cancelingId === code.id}
                      className="px-4 py-2 text-sm"
                    >
                      {cancelingId === code.id ? "جاري الإلغاء..." : "إلغاء"}
                    </Button>
                  : null}
                </div>
              </div>
            ))
          : <p className="text-sm text-slate-500">
              لا توجد أكواد حتى الآن. أنشئ مجموعة جديدة.
            </p>
          }
        </div>
      </Card>
    </div>
  );
}
