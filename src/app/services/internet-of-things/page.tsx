"use client";

import {
  Navbar,
  IoTHeroSection,
  IoTOffersSection,
  IoTKeyFeaturesSection,
  IoTHowItWorksSection,
  IoTStatsSection,
  IoTIndustriesSection,
  EnquirySection,
  Footer,
} from "@/components";

export default function InternetOfThingsPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <IoTHeroSection />
      <IoTOffersSection />
      <IoTKeyFeaturesSection />
      <IoTHowItWorksSection />
      <IoTStatsSection />
      <IoTIndustriesSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
