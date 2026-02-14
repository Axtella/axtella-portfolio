"use client";

import {
  Navbar,
  ELVHeroSection,
  ELVOffersSection,
  ELVKeyFeaturesSection,
  ELVHowItWorksSection,
  ELVStatsSection,
  ELVIndustriesSection,
  EnquirySection,
  Footer,
} from "@/components";

export default function ELVSystemsPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <ELVHeroSection />
      <ELVOffersSection />
      <ELVKeyFeaturesSection />
      <ELVHowItWorksSection />
      <ELVStatsSection />
      <ELVIndustriesSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
