"use client";

import { Navbar, FleetManagementHeroSection, FleetOffersSection, FleetKeyFeaturesSection, FleetHowItWorksSection, FleetDashboardSection, FleetStatsSection, FleetIndustriesSection, FleetTechSection, FleetPricingSection, EnquirySection, Footer } from "@/components";

export default function FleetManagementPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <FleetManagementHeroSection />
      <FleetOffersSection />
      <FleetKeyFeaturesSection />
      <FleetHowItWorksSection />
      <FleetDashboardSection />
      <FleetStatsSection />
      <FleetIndustriesSection />
      <FleetTechSection />
      <FleetPricingSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
