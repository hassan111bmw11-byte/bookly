"use client";

import { useState, useEffect } from "react";
import { Upload, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

type FileResource = {
  id: number;
  title: string;
  type: string;
  url: string;
  createdAt: string;
};

export default function FileLibraryForm() {
  const [formData, setFormData] = useState({
    title: "",
    type: "DOCUMENT",
  });
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    try {
      const response = await fetch("/api/teacher/files");
      const data = await response.json();
      if (response.ok) {
        setFiles(data.files);
      }
    } catch (error) {
      console.error("Failed to fetch files:", error);
    } finally {
      setFetching(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("يرجى اختيار ملف");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("title", formData.title);
      uploadFormData.append("type", formData.type);

      const response = await fetch("/api/teacher/files", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();
      if (response.ok) {
        setFormData({ title: "", type: "DOCUMENT" });
        setFile(null);
        fetchFiles();
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("فشل في رفع الملف");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const typeLabels: Record<string, string> = {
    DOCUMENT: "مستند",
    VIDEO: "فيديو",
    OTHER: "آخر",
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-6 text-xl font-black">إضافة ملف</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="العنوان"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <div>
              <label className="text-sm font-medium">نوع الملف</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2"
              >
                <option value="DOCUMENT">مستند</option>
                <option value="VIDEO">فيديو</option>
                <option value="OTHER">آخر</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">اختر الملف</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-2 w-full"
              accept="*"
            />
            {file && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {file.name}
              </p>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" disabled={loading} variant="outline">
            <Upload size={18} />
            {loading ? "جاري الرفع..." : "رفع الملف"}
          </Button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-6 text-xl font-black">المكتبة ({files.length})</h2>
        {fetching ?
          <p className="text-slate-500">جاري التحميل...</p>
        : files.length === 0 ?
          <p className="text-slate-500">لم يتم رفع ملفات بعد</p>
        : <div className="space-y-3">
            {files.map((fileItem) => (
              <div
                key={fileItem.id}
                className="rounded-lg border border-slate-200 dark:border-slate-700 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{fileItem.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(fileItem.createdAt).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                      {typeLabels[fileItem.type] || fileItem.type}
                    </span>
                    <a
                      href={fileItem.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Download size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </Card>
    </div>
  );
}
