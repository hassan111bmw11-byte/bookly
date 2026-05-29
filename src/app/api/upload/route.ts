import { supabaseAdmin } from "@/lib/supabase";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file)
      return new Response(JSON.stringify({ error: "لا توجد ملفات" }), {
        status: 400,
      });

    const mime = file.type || "application/octet-stream";
    const bucket =
      mime.startsWith("image/") ? "images"
      : mime.startsWith("video/") ? "videos"
      : "files";

    const name = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(name, buffer, {
        contentType: mime,
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${encodeURIComponent(name)}`;

    return new Response(JSON.stringify({ url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("/api/upload error", err);
    return new Response(JSON.stringify({ error: "خطأ في تحميل الملف" }), {
      status: 500,
    });
  }
}
