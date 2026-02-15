import {
  Navbar,
  HeroSection,
  ScrollHighlightSection,
  LogoMarquee,
  MentorSection,
  FleetLaunchSection,
  DiscoverCoursesSection,
  FeaturedSection,
  WhyBusinessLoveSection,
  ArticlesSection,
  EnquirySection,
  Footer
} from "@/components";
import { getPageData, getSection } from "@/lib/page-data";
import { generateSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("home");
  return generateSeoMetadata("Home", page);
}

export default async function Home() {
  const page = await getPageData("home");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = (page?.sections as any[]) || [];

  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <HeroSection data={getSection(sections, "hero")} />
      <ScrollHighlightSection data={getSection(sections, "scroll-highlight")} />
      <LogoMarquee />
      <MentorSection data={getSection(sections, "mentor")} />
      <FleetLaunchSection />
      <DiscoverCoursesSection />
      <FeaturedSection />
      <WhyBusinessLoveSection />
      <ArticlesSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
