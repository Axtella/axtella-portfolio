import {
  Navbar,
  CareerHeroSection,
  CareerWhySection,
  CareerDepartmentsSection,
  CareerPositionsSection,
  CareerCTASection,
  Footer,
} from "@/components";
import { getPageData, getSection } from "@/lib/page-data";
import { generateSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("careers");
  return generateSeoMetadata("Careers", page);
}

export default async function CareersPage() {
  const page = await getPageData("careers");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = (page?.sections as any[]) || [];

  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <CareerHeroSection data={getSection(sections, "hero")} />
      <CareerWhySection data={getSection(sections, "why-join")} />
      <CareerDepartmentsSection data={getSection(sections, "departments")} />
      <CareerPositionsSection />
      <CareerCTASection />
      <Footer />
    </main>
  );
}
