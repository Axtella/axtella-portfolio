import { prisma } from "./prisma";

export async function getPublishedServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: { title: true, slug: true, isNew: true },
  });
}
