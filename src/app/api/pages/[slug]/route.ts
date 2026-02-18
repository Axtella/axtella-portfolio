import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(page);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await request.json();

  const page = await prisma.page.update({
    where: { slug },
    data: {
      slug: body.slug ?? slug,
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

  return NextResponse.json(page);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  await prisma.page.delete({ where: { slug } });
  return NextResponse.json({ success: true });
}
