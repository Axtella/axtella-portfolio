"use client";

import {
  Navbar,
  EMWHeroSection,
  EMWOffersSection,
  EMWKeyFeaturesSection,
  EMWHowItWorksSection,
  EMWStatsSection,
  EMWIndustriesSection,
  EnquirySection,
  Footer,
} from "@/components";

export default function ElectroMechanicalWorksPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <EMWHeroSection />
      <EMWOffersSection />
      <EMWKeyFeaturesSection />
      <EMWHowItWorksSection />
      <EMWStatsSection />
      <EMWIndustriesSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
