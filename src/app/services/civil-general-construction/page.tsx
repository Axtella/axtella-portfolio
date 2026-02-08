"use client";

import { Navbar, ServiceHeroSection, EnquirySection, Footer } from "@/components";

export default function CivilGeneralConstructionPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <ServiceHeroSection
        title="Civil & General Construction"
        description="Professional civil engineering and general construction services. From site preparation to structural works, we deliver quality construction projects on time and within budget."
      />
      <section className="w-full bg-white py-16 md:py-24">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl">
            <h2
              className="font-bold text-[#080D1A] mb-6"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(24px, 3vw, 40px)",
              }}
            >
              Quality Construction Services
            </h2>
            <p
              className="text-gray-600 mb-4"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "clamp(14px, 1.3vw, 17px)",
                lineHeight: "1.8",
              }}
            >
              Our civil and construction capabilities include site development, structural engineering, concrete and steel works, road and infrastructure projects, and renovation and fit-out services. We maintain the highest standards of safety and quality across all projects.
            </p>
            <p
              className="text-gray-500"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                lineHeight: "1.7",
              }}
            >
              Full service details coming soon. Contact us for more information.
            </p>
          </div>
        </div>
      </section>
      <EnquirySection />
      <Footer />
    </main>
  );
}
