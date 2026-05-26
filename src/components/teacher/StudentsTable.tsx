"use client";

import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import Card from "@/components/ui/Card";
import SearchInput from "@/components/ui/SearchInput";

type Student = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  walletBalance: number;
};

export default function StudentsTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch("/api/teacher/students");
        const data = await response.json();
        if (response.ok) {
          const mappedStudents = data.students.map((student: Student) => ({
            id: student.id,
            name: student.name,
            email: student.email,
            phoneNumber: student.phoneNumber,
            walletBalance: student.walletBalance || 0,
          }));
          setStudents(mappedStudents);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    [student.name, student.email, student.phoneNumber]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <Card>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SearchInput
          placeholder="بحث بالاسم أو الهاتف..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="overflow-auto">
        {loading ?
          <p className="p-4 text-slate-500">جاري تحميل الطلاب...</p>
        : filteredStudents.length === 0 ?
          <p className="p-4 text-slate-500">لا توجد نتائج.</p>
        : <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-white/10 text-right text-slate-400">
                <th className="p-3">الاسم</th>
                <th className="p-3">الهاتف</th>
                <th className="p-3">البريد الإلكتروني</th>
                <th className="p-3">رصيد المحفظة</th>
                <th className="p-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-white/10">
                  <td className="p-3 font-bold">{student.name}</td>
                  <td className="p-3">{student.phoneNumber}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">{student.walletBalance} ج</td>
                  <td className="p-3 text-left">
                    <button
                      className="text-rose-600 hover:underline"
                      disabled={deletingId === student.id}
                      onClick={async () => {
                        const ok = confirm(
                          `هل تريد حذف الطالب ${student.name}؟`,
                        );
                        if (!ok) return;
                        try {
                          setDeletingId(student.id);
                          const res = await fetch(
                            `/api/teacher/students/${student.id}`,
                            {
                              method: "DELETE",
                            },
                          );
                          const data = await res.json();
                          if (!res.ok) {
                            alert(data.error || "فشل الحذف");
                          } else {
                            setStudents((s) =>
                              s.filter((st) => st.id !== student.id),
                            );
                          }
                        } catch (err) {
                          console.error(err);
                          alert("حدث خطأ أثناء الحذف");
                        } finally {
                          setDeletingId(null);
                        }
                      }}
                    >
                      {deletingId === student.id ? "جارٍ الحذف..." : "حذف"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </Card>
  );
}
