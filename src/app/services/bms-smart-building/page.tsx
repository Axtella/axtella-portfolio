"use client";

import { Navbar, ServiceHeroSection, EnquirySection, Footer } from "@/components";

export default function BMSSmartBuildingPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <ServiceHeroSection
        title="BMS & Smart Building"
        description="Building Management Systems and smart building technologies that optimize energy usage, enhance occupant comfort, and streamline facility operations through intelligent automation."
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
              Intelligent Building Automation
            </h2>
            <p
              className="text-gray-600 mb-4"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "clamp(14px, 1.3vw, 17px)",
                lineHeight: "1.8",
              }}
            >
              Our BMS solutions integrate HVAC control, lighting management, energy monitoring, security systems, and fire safety into a unified platform. We help buildings become smarter, greener, and more efficient through cutting-edge automation technologies.
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
