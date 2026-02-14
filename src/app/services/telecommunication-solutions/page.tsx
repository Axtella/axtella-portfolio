"use client";

import {
  Navbar,
  TelecomHeroSection,
  TelecomOffersSection,
  TelecomKeyFeaturesSection,
  TelecomHowItWorksSection,
  TelecomStatsSection,
  TelecomIndustriesSection,
  EnquirySection,
  Footer,
} from "@/components";

export default function TelecommunicationSolutionsPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <TelecomHeroSection />
      <TelecomOffersSection />
      <TelecomKeyFeaturesSection />
      <TelecomHowItWorksSection />
      <TelecomStatsSection />
      <TelecomIndustriesSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
