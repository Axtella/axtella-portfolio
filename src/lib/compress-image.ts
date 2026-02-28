import imageCompression from "browser-image-compression";

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  const compressed = await imageCompression(file, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    fileType: "image/webp",
    useWebWorker: true,
  });

  // Rename to .webp extension
  const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
  return new File([compressed], `${baseName}.webp`, {
    type: "image/webp",
  });
}
