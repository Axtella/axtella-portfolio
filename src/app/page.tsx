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
import { getPublishedBlogs } from "@/lib/blog-queries";
import { generateSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import type { BlogPost } from "@/types/blog";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("home");
  return generateSeoMetadata("Home", page);
}

export default async function Home() {
  const [page, blogs] = await Promise.all([
    getPageData("home"),
    getPublishedBlogs(),
  ]);
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
      <DiscoverCoursesSection data={getSection(sections, "discover-services")} />
      <FeaturedSection data={getSection(sections, "featured")} />
      <WhyBusinessLoveSection data={getSection(sections, "why-business-love")} />
      <ArticlesSection articles={blogs as unknown as BlogPost[]} />
      <EnquirySection />
      <Footer />
    </main>
  );
}
