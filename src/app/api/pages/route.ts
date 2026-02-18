import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const pages = await prisma.page.findMany({
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(pages);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const page = await prisma.page.create({
    data: {
      slug: body.slug,
      title: body.title,
      sections: body.sections || [],
      published: body.published ?? true,
      metaTitle: body.metaTitle || null,
      metaDescription: body.metaDescription || null,
      ogImage: body.ogImage || null,
      ogTitle: body.ogTitle || null,
      ogDescription: body.ogDescription || null,
      canonicalUrl: body.canonicalUrl || null,
      noIndex: body.noIndex ?? false,
    },
  });

  return NextResponse.json(page, { status: 201 });
}
