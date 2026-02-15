import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const faq = await prisma.fAQ.update({
    where: { id },
    data: {
      question: body.question,
      answer: body.answer,
      page: body.page || "contact",
      order: body.order ?? 0,
      active: body.active ?? true,
    },
  });

  return NextResponse.json(faq);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.fAQ.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
