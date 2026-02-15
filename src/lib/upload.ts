import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function saveFile(file: File): Promise<{
  filename: string;
  url: string;
  size: number;
  mimeType: string;
}> {
  await mkdir(UPLOAD_DIR, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate unique filename
  const ext = path.extname(file.name);
  const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9-_]/g, "-");
  const uniqueName = `${baseName}-${Date.now()}${ext}`;
  const filePath = path.join(UPLOAD_DIR, uniqueName);

  await writeFile(filePath, buffer);

  return {
    filename: uniqueName,
    url: `/uploads/${uniqueName}`,
    size: file.size,
    mimeType: file.type,
  };
}

export async function getImageDimensions(
  file: File
): Promise<{ width: number; height: number } | null> {
  if (!file.type.startsWith("image/")) return null;

  try {
    const sharp = (await import("sharp")).default;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width || 0,
      height: metadata.height || 0,
    };
  } catch {
    return null;
  }
}
