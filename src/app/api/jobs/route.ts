import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const jobs = await prisma.jobPosition.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const job = await prisma.jobPosition.create({
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

  return NextResponse.json(job, { status: 201 });
}
