"use client";

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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <HeroSection />
      <ScrollHighlightSection />
      <LogoMarquee />
      <MentorSection />
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
