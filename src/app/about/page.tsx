"use client";

import { Navbar, AboutHeroSection, ScrollHighlightSection, StatisticsSection, MissionVisionSection, MeetFounderSection, CoreValuesSection, ClientLogosSection, VoicesTrustSection, EnquirySection, Footer } from "@/components";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <AboutHeroSection />
      <ScrollHighlightSection />

      <MissionVisionSection />
      <MeetFounderSection />
      <StatisticsSection />
      <CoreValuesSection />
      <ClientLogosSection />
      <VoicesTrustSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
