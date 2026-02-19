import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveFile, getImageDimensions } from "@/lib/upload";

export async function GET() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(media);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const { filename, url, size, mimeType } = await saveFile(file);
    const dimensions = await getImageDimensions(file);
    const alt = (formData.get("alt") as string) || "";

    const media = await prisma.media.create({
      data: {
        filename,
        url,
        alt,
        size,
        mimeType,
        width: dimensions?.width || null,
        height: dimensions?.height || null,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error("Media upload error:", error);
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
