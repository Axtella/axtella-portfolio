import { prisma } from "@/lib/prisma";

export async function getPageData(slug: string) {
  return prisma.page.findUnique({ where: { slug } });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSection(sections: any[], type: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sections.find((s: any) => s.type === type) || null;
}
