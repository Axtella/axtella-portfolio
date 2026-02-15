import { Navbar, AboutHeroSection, ScrollHighlightSection, StatisticsSection, MissionVisionSection, CoreValuesSection, ClientLogosSection, WhatSetsApartSection, EnquirySection, Footer } from "@/components";
import { getPageData, getSection } from "@/lib/page-data";
import { generateSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("about");
  return generateSeoMetadata("About", page);
}

export default async function AboutPage() {
  const page = await getPageData("about");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = (page?.sections as any[]) || [];

  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <AboutHeroSection data={getSection(sections, "hero")} />
      <ScrollHighlightSection data={getSection(sections, "scroll-highlight")} />
      <MissionVisionSection data={getSection(sections, "mission-vision")} />
      <CoreValuesSection data={getSection(sections, "core-values")} />
      <ClientLogosSection />
      <WhatSetsApartSection data={getSection(sections, "what-sets-apart")} />
      <EnquirySection />
      <Footer />
    </main>
  );
}
