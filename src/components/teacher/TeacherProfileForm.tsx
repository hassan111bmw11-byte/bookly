"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function TeacherProfileForm() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/auth/me");
      const json = await res.json();
      if (json?.user) {
        setUserId(json.user.id);
        setName(json.user.name || "");
      }
    }
    load();
  }, []);

  async function handleUpload(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    return data.url as string | undefined;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    try {
      const body: any = { userId };
      if (name) body.name = name;
      if (avatar) body.avatarUrl = avatar;

      await fetch("/api/teacher/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Card>
        <div className="mb-5 flex items-center gap-5">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-800">
            {avatar ?
              <img
                src={avatar}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            : <div className="grid h-full w-full place-items-center text-white">
                ?
              </div>
            }
          </div>
          <label className="inline-flex">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setLoading(true);
                try {
                  const url = await handleUpload(f);
                  if (url) setAvatar(url);
                } finally {
                  setLoading(false);
                }
              }}
            />
            <Button variant="outline">تغيير الصورة</Button>
          </label>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <Input
            label="الاسم"
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="الهاتف" defaultValue="" />
            <Input label="هاتف ولي الأمر" defaultValue="" />
          </div>
          <Input label="المحافظة" defaultValue="" />
          <Textarea label="نبذة" />
          <Button type="submit" disabled={loading}>
            {loading ? "جاري الحفظ..." : "حفظ"}
          </Button>
        </form>
      </Card>
      <Card>
        <h2 className="mb-4 text-xl font-black">تغيير كلمة المرور</h2>
        <div className="flex gap-3">
          <Input placeholder="كلمة مرور جديدة" type="password" />
          <Button variant="outline">تغيير</Button>
        </div>
      </Card>
    </div>
  );
}
