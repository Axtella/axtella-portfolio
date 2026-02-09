"use client";

import { Navbar, AboutHeroSection, ScrollHighlightSection, StatisticsSection, MissionVisionSection, CoreValuesSection, ClientLogosSection, VoicesTrustSection, WhatSetsApartSection, EnquirySection, Footer } from "@/components";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <AboutHeroSection />
      <ScrollHighlightSection />
      <MissionVisionSection />

     
      <CoreValuesSection />
      <ClientLogosSection />
      <WhatSetsApartSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
