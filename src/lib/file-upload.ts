import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function saveFile(
  file: File,
  subfolder: string = "uploads",
): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = join(process.cwd(), "public", subfolder);
  await mkdir(uploadsDir, { recursive: true });

  const filename = `${Date.now()}-${file.name}`;
  const filepath = join(uploadsDir, filename);

  await writeFile(filepath, buffer);

  return `/${subfolder}/${filename}`;
}

export async function handleFileUpload(
  formData: FormData,
  subfolder: string = "uploads",
): Promise<string> {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("لم يتم تحميل أي ملف");
  }

  const maxSize = 100 * 1024 * 1024; // 100MB
  if (file.size > maxSize) {
    throw new Error("حجم الملف كبير جداً. الحد الأقصى هو 100MB");
  }

  return saveFile(file, subfolder);
}
