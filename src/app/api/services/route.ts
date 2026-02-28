import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");

    const services = await prisma.service.findMany({
      where: published === "true" ? { published: true } : undefined,
      orderBy: { order: "asc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Services fetch error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch services";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const service = await prisma.service.create({
    data: {
      slug: body.slug,
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
      isNew: body.isNew ?? false,
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

  return NextResponse.json(service, { status: 201 });
}
