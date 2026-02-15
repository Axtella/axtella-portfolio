import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const job = await prisma.jobPosition.update({
    where: { id },
    data: {
      title: body.title,
      department: body.department,
      location: body.location,
      type: body.type,
      description: body.description || null,
      active: body.active ?? true,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(job);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.jobPosition.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
