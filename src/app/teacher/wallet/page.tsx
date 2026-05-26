"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import Card from "@/components/ui/Card";
import { Wallet } from "lucide-react";
import { teacherNavItems } from "@/data/platform";

type StudentWallet = {
  id: number;
  name: string;
  phoneNumber: string;
  walletBalance: number;
};

export default function Page() {
  const [students, setStudents] = useState<StudentWallet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWallets() {
      try {
        const response = await fetch("/api/teacher/wallet");
        const data = await response.json();
        if (response.ok) {
          setStudents(data.students);
        }
      } catch (error) {
        console.error("Failed to fetch teacher wallet data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWallets();
  }, []);

  return (
    <DashboardLayout title="لوحة المعلم" items={teacherNavItems}>
      <PageTitle title="محافظ الطلاب" />
      <div className="space-y-4">
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">أجمالي الطلاب</p>
              <p className="mt-2 text-3xl font-black">{students.length}</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-3 text-slate-700 dark:bg-slate-800 dark:text-slate-100">
              <Wallet size={20} />
              محافظ الطلاب
            </div>
          </div>
        </Card>

        <Card>
          {loading ?
            <p className="text-slate-500">جاري تحميل بيانات المحافظ...</p>
          : students.length === 0 ?
            <p className="text-slate-500">
              لا توجد بيانات محفظة طلابية حتى الآن.
            </p>
          : <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-right text-slate-400">
                    <th className="p-3">الاسم</th>
                    <th className="p-3">الهاتف</th>
                    <th className="p-3">الرصيد</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-white/10">
                      <td className="p-3 font-semibold">{student.name}</td>
                      <td className="p-3">{student.phoneNumber}</td>
                      <td className="p-3">{student.walletBalance} ج</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </Card>
      </div>
    </DashboardLayout>
  );
}
