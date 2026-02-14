"use client";

import {
  Navbar,
  CareerHeroSection,
  CareerWhySection,
  CareerDepartmentsSection,
  CareerPositionsSection,
  CareerCTASection,
  Footer,
} from "@/components";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <CareerHeroSection />
      <CareerWhySection />
      <CareerDepartmentsSection />
      <CareerPositionsSection />
      <CareerCTASection />
      <Footer />
    </main>
  );
}
