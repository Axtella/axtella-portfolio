import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const activeOnly = request.nextUrl.searchParams.get("active") === "true";
  const withCounts = request.nextUrl.searchParams.get("withCounts") === "true";

  if (withCounts) {
    const jobs = await prisma.jobPosition.findMany({
      where: activeOnly ? { active: true } : undefined,
      orderBy: { order: "asc" },
      include: { applications: { select: { id: true } } },
    });
    const result = jobs.map(({ applications, ...job }) => ({
      ...job,
      _count: { applications: applications.length },
    }));
    return NextResponse.json(result);
  }

  const jobs = await prisma.jobPosition.findMany({
    where: activeOnly ? { active: true } : undefined,
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
