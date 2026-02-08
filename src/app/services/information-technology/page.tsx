"use client";

import { Navbar, ServiceHeroSection, EnquirySection, Footer } from "@/components";

export default function InformationTechnologyPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <ServiceHeroSection
        title="Information Technology"
        description="Comprehensive IT solutions covering infrastructure, cloud services, cybersecurity, and digital transformation. We help businesses leverage technology to drive efficiency and growth."
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
              Driving Digital Transformation
            </h2>
            <p
              className="text-gray-600 mb-4"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "clamp(14px, 1.3vw, 17px)",
                lineHeight: "1.8",
              }}
            >
              From IT infrastructure setup and management to cloud migration, cybersecurity solutions, and enterprise software deployment — we provide the technology backbone your business needs to thrive in the digital age.
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
