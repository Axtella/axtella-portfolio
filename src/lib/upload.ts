import { put, del } from "@vercel/blob";

export async function saveFile(
  file: File,
  subdir?: string
): Promise<{
  filename: string;
  url: string;
  size: number;
  mimeType: string;
}> {
  const ext = file.name.substring(file.name.lastIndexOf("."));
  const baseName = file.name
    .substring(0, file.name.lastIndexOf("."))
    .replace(/[^a-zA-Z0-9-_]/g, "-");
  const uniqueName = `${baseName}-${Date.now()}${ext}`;

  const pathname = subdir ? `${subdir}/${uniqueName}` : uniqueName;

  const blob = await put(pathname, file, {
    access: "public",
  });

  return {
    filename: uniqueName,
    url: blob.url,
    size: file.size,
    mimeType: file.type,
  };
}

export async function deleteFile(url: string): Promise<void> {
  try {
    await del(url);
  } catch {
    // File may not exist, ignore
  }
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
