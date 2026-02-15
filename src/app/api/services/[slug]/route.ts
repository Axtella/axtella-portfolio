import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(service);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await request.json();

  const service = await prisma.service.update({
    where: { slug },
    data: {
      slug: body.slug ?? slug,
      title: body.title,
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle || null,
      heroImage: body.heroImage || null,
      offers: body.offers || [],
      features: body.features || [],
      howItWorks: body.howItWorks || [],
      stats: body.stats || [],
      industries: body.industries || [],
      techStack: body.techStack || [],
      pricing: body.pricing || [],
      published: body.published ?? true,
      order: body.order ?? 0,
      metaTitle: body.metaTitle || null,
      metaDescription: body.metaDescription || null,
      ogImage: body.ogImage || null,
      ogTitle: body.ogTitle || null,
      ogDescription: body.ogDescription || null,
      canonicalUrl: body.canonicalUrl || null,
      noIndex: body.noIndex ?? false,
    },
  });

  return NextResponse.json(service);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  await prisma.service.delete({ where: { slug } });
  return NextResponse.json({ success: true });
}
