import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteFile } from "@/lib/upload";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const application = await prisma.jobApplication.findUnique({
    where: { id },
    include: { job: true },
  });

  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(application);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const application = await prisma.jobApplication.update({
    where: { id },
    data: {
      ...(body.status !== undefined && { status: body.status }),
      ...(body.adminNotes !== undefined && { adminNotes: body.adminNotes }),
    },
  });

  return NextResponse.json(application);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Get application to find CV file path
  const application = await prisma.jobApplication.findUnique({ where: { id } });
  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Delete from database
  await prisma.jobApplication.delete({ where: { id } });

  // Delete CV file from Vercel Blob
  await deleteFile(application.cvUrl);

  return NextResponse.json({ success: true });
}
