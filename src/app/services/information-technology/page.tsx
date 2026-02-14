"use client";

import {
  Navbar,
  ITHeroSection,
  ITOffersSection,
  ITKeyFeaturesSection,
  ITHowItWorksSection,
  ITStatsSection,
  ITIndustriesSection,
  EnquirySection,
  Footer,
} from "@/components";

export default function InformationTechnologyPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <ITHeroSection />
      <ITOffersSection />
      <ITKeyFeaturesSection />
      <ITHowItWorksSection />
      <ITStatsSection />
      <ITIndustriesSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
