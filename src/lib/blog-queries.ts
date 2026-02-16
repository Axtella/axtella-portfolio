import { prisma } from "./prisma";

export async function getPublishedBlogs(categorySlug?: string) {
  const where: Record<string, unknown> = { published: true };
  if (categorySlug && categorySlug !== "all") {
    where.category = { slug: categorySlug };
  }

  return prisma.blogPost.findMany({
    where,
    include: { category: true, author: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getBlogBySlug(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true, author: true },
  });
}

export async function getRelatedBlogs(
  currentSlug: string,
  categoryId: string | null,
  limit: number = 2
) {
  return prisma.blogPost.findMany({
    where: {
      published: true,
      slug: { not: currentSlug },
      ...(categoryId ? { categoryId } : {}),
    },
    include: { category: true, author: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getBlogCategories() {
  return prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
  });
}
