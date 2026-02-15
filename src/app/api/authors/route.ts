import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const authors = await prisma.author.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(authors);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const author = await prisma.author.create({
    data: {
      name: body.name,
      role: body.role || null,
      avatar: body.avatar || null,
      bio: body.bio || null,
    },
  });

  return NextResponse.json(author, { status: 201 });
}
