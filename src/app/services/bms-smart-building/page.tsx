"use client";

import {
  Navbar,
  BMSHeroSection,
  BMSOffersSection,
  BMSKeyFeaturesSection,
  BMSHowItWorksSection,
  BMSStatsSection,
  BMSIndustriesSection,
  EnquirySection,
  Footer,
} from "@/components";

export default function BMSSmartBuildingPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <BMSHeroSection />
      <BMSOffersSection />
      <BMSKeyFeaturesSection />
      <BMSHowItWorksSection />
      <BMSStatsSection />
      <BMSIndustriesSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
