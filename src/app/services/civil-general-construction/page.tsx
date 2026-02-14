"use client";

import {
  Navbar,
  CGCHeroSection,
  CGCOffersSection,
  CGCKeyFeaturesSection,
  CGCHowItWorksSection,
  CGCStatsSection,
  CGCIndustriesSection,
  EnquirySection,
  Footer,
} from "@/components";

export default function CivilGeneralConstructionPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <CGCHeroSection />
      <CGCOffersSection />
      <CGCKeyFeaturesSection />
      <CGCHowItWorksSection />
      <CGCStatsSection />
      <CGCIndustriesSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
