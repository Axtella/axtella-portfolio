"use client";

import { Navbar, ServiceHeroSection, EnquirySection, Footer } from "@/components";

export default function ElectroMechanicalWorksPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <ServiceHeroSection
        title="Electro Mechanical Works"
        description="Complete electro-mechanical engineering services including HVAC, electrical systems, plumbing, and fire fighting. From design to commissioning, we deliver reliable MEP solutions."
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
              Complete MEP Engineering
            </h2>
            <p
              className="text-gray-600 mb-4"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "clamp(14px, 1.3vw, 17px)",
                lineHeight: "1.8",
              }}
            >
              Our electro-mechanical services cover HVAC system design and installation, electrical power distribution, plumbing and drainage systems, fire fighting and suppression, and preventive maintenance programs for commercial and industrial projects.
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
