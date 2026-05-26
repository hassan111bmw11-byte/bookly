"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/shared/DashboardLayout";
import PageTitle from "@/components/shared/PageTitle";
import Card from "@/components/ui/Card";
import { FileText, Download } from "lucide-react";
import { studentNavItems } from "@/data/platform";

type FileResource = {
  id: number;
  title: string;
  type: string;
  url: string;
  teacher: {
    name: string;
  };
  createdAt: string;
};

const typeLabels: Record<string, string> = {
  DOCUMENT: "مستند",
  VIDEO: "فيديو",
  OTHER: "آخر",
};

export default function Page() {
  const [files, setFiles] = useState<FileResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch("/api/student/files");
        const data = await response.json();
        if (response.ok) {
          setFiles(data.files);
        }
      } catch (error) {
        console.error("Failed to fetch files:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, []);

  return (
    <DashboardLayout title="لوحة الطالب" items={studentNavItems}>
      <PageTitle title="الملفات" />
      <div className="space-y-4">
        {loading ?
          <Card>
            <p className="text-slate-500">جاري تحميل الملفات...</p>
          </Card>
        : files.length === 0 ?
          <Card>
            <p className="text-center text-slate-500">لا توجد ملفات حالياً</p>
          </Card>
        : <div className="grid gap-4">
            {files.map((file) => (
              <Card key={file.id}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{file.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        من {file.teacher.name}
                      </p>
                    </div>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700"
                    >
                      <Download size={16} /> تنزيل
                    </a>
                  </div>
                  <span className="inline-flex rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs text-slate-700 dark:text-slate-200">
                    {typeLabels[file.type] || file.type}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        }
      </div>
    </DashboardLayout>
  );
}
