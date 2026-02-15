import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const blog = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true, author: true },
  });

  if (!blog) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await request.json();

  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Set publishedAt when first published
  let publishedAt = existing.publishedAt;
  if (body.published && !existing.publishedAt) {
    publishedAt = new Date();
  }

  const blog = await prisma.blogPost.update({
    where: { slug },
    data: {
      slug: body.slug ?? slug,
      title: body.title,
      excerpt: body.excerpt || null,
      description: body.description || null,
      content: body.content || [],
      image: body.image || null,
      featuredImage: body.featuredImage || null,
      imageAlt: body.imageAlt || null,
      categoryId: body.categoryId || null,
      tags: body.tags || [],
      authorId: body.authorId || null,
      readTime: body.readTime || null,
      featured: body.featured ?? false,
      published: body.published ?? false,
      publishedAt,
      metaTitle: body.metaTitle || null,
      metaDescription: body.metaDescription || null,
      ogImage: body.ogImage || null,
      ogTitle: body.ogTitle || null,
      ogDescription: body.ogDescription || null,
      canonicalUrl: body.canonicalUrl || null,
      noIndex: body.noIndex ?? false,
    },
    include: { category: true, author: true },
  });

  return NextResponse.json(blog);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  await prisma.blogPost.delete({ where: { slug } });
  return NextResponse.json({ success: true });
}
