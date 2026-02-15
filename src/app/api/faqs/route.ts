import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(faqs);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const faq = await prisma.fAQ.create({
    data: {
      question: body.question,
      answer: body.answer,
      page: body.page || "contact",
      order: body.order ?? 0,
      active: body.active ?? true,
    },
  });

  return NextResponse.json(faq, { status: 201 });
}
