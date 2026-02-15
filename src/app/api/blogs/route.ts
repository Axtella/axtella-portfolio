import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const published = searchParams.get("published");
  const featured = searchParams.get("featured");

  const where: Record<string, unknown> = {};
  if (category) where.category = { slug: category };
  if (published === "true") where.published = true;
  if (featured === "true") where.featured = true;

  const blogs = await prisma.blogPost.findMany({
    where,
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(blogs);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const blog = await prisma.blogPost.create({
    data: {
      slug: body.slug,
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
      featured: body.featured || false,
      published: body.published || false,
      publishedAt: body.published ? new Date() : null,
      metaTitle: body.metaTitle || null,
      metaDescription: body.metaDescription || null,
      ogImage: body.ogImage || null,
      ogTitle: body.ogTitle || null,
      ogDescription: body.ogDescription || null,
      canonicalUrl: body.canonicalUrl || null,
      noIndex: body.noIndex || false,
    },
    include: { category: true, author: true },
  });

  return NextResponse.json(blog, { status: 201 });
}
