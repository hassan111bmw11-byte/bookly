"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/shared/ToastProvider";
import { Wallet } from "lucide-react";
import { studentNavItems } from "@/data/platform";

type WalletTransaction = {
  id: number;
  amount: number;
  type: "CREDIT" | "DEBIT";
  description: string | null;
  createdAt: string;
};

export default function Page() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [redemptionCode, setRedemptionCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [redeemLoading, setRedeemLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchWallet() {
      try {
        const response = await fetch("/api/student/wallet");
        const data = await response.json();
        if (response.ok) {
          setBalance(data.balance);
          setTransactions(data.transactions);
        }
      } catch (error) {
        console.error("Failed to fetch wallet:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWallet();
  }, []);

  const handleRedeem = async () => {
    if (!redemptionCode.trim()) {
      toast.show("أدخل كود الشحن", "error");
      return;
    }

    setRedeemLoading(true);
    try {
      const response = await fetch("/api/student/redeem-charge-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: redemptionCode.trim() }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.show(data?.error || "فشل تفعيل الكود.", "error");
        return;
      }
      toast.show("تم تفعيل الكود بنجاح", "success");
      setRedemptionCode("");
      const walletResponse = await fetch("/api/student/wallet");
      const walletData = await walletResponse.json();
      if (walletResponse.ok) {
        setBalance(walletData.balance);
        setTransactions(walletData.transactions);
      }
    } catch (error) {
      console.error("Failed to redeem code:", error);
      toast.show("فشل تفعيل الكود.", "error");
    } finally {
      setRedeemLoading(false);
    }
  };

  return (
    <DashboardLayout title="لوحة الطالب" items={studentNavItems}>
      <PageTitle title="المحفظة" />
      <div className="space-y-4">
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">الرصيد الحالي</p>
              <p className="mt-2 text-3xl font-black">{balance} ج</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-3 text-slate-700 dark:bg-slate-800 dark:text-slate-100">
              <Wallet size={20} />
              محافظي
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-black">تفعيل كود الشحن</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
            <Input
              label="أدخل الكود"
              value={redemptionCode}
              onChange={(e) => setRedemptionCode(e.target.value)}
              placeholder="كود الشحن هنا"
            />
            <Button onClick={handleRedeem} disabled={redeemLoading}>
              {redeemLoading ? "جاري التفعيل..." : "تفعيل الكود"}
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-black">سجل الحركة</h2>
          {loading ?
            <p className="mt-4 text-slate-500">جاري تحميل البيانات...</p>
          : transactions.length === 0 ?
            <p className="mt-4 text-slate-500">لا توجد عمليات حتى الآن.</p>
          : <div className="mt-4 space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col gap-2 rounded-lg border border-slate-200 dark:border-slate-700 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">
                      {transaction.type === "CREDIT" ? "إضافة" : "سحب"}
                    </span>
                    <span
                      className={
                        transaction.type === "CREDIT" ?
                          "text-emerald-600"
                        : "text-rose-600"
                      }
                    >
                      {transaction.amount} ج
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    {transaction.description || "بدون وصف"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(transaction.createdAt).toLocaleString("ar-EG")}
                  </p>
                </div>
              ))}
            </div>
          }
        </Card>
      </div>
    </DashboardLayout>
  );
}
