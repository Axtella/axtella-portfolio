import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { generateSeoMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

// Shared components
import { NavbarServer as Navbar } from "@/components/navbar-server";
import { Footer } from "@/components/footer";
import { EnquirySection } from "@/components/enquiry-section";
import { ServiceHeroSection } from "@/components/service-hero-section";

// Hero imports (one per service — each has a unique SVG illustration)
import { TelecomHeroSection } from "@/components/telecom-hero-section";
import { ITHeroSection } from "@/components/it-hero-section";
import { IoTHeroSection } from "@/components/iot-hero-section";
import { ELVHeroSection } from "@/components/elv-hero-section";
import { BMSHeroSection } from "@/components/bms-hero-section";
import { EMWHeroSection } from "@/components/emw-hero-section";
import { CGCHeroSection } from "@/components/cgc-hero-section";
import { FleetManagementHeroSection } from "@/components/fleet-management-hero-section";

// Body section imports (Telecom sections used generically for all services)
import { TelecomOffersSection as ServiceOffersSection } from "@/components/telecom-offers-section";
import { TelecomKeyFeaturesSection as ServiceFeaturesSection } from "@/components/telecom-key-features-section";
import { TelecomHowItWorksSection as ServiceHowItWorksSection } from "@/components/telecom-how-it-works-section";
import { TelecomStatsSection as ServiceStatsSection } from "@/components/telecom-stats-section";
import { TelecomIndustriesSection as ServiceIndustriesSection } from "@/components/telecom-industries-section";

// Fleet-unique sections (rendered conditionally)
import { FleetDashboardSection } from "@/components/fleet-dashboard-section";
import { FleetTechSection } from "@/components/fleet-tech-section";
import { FleetPricingSection } from "@/components/fleet-pricing-section";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const heroMap: Record<string, React.ComponentType<{ data?: any }>> = {
  "telecommunication-solutions": TelecomHeroSection,
  "information-technology": ITHeroSection,
  "internet-of-things": IoTHeroSection,
  "elv-systems": ELVHeroSection,
  "bms-smart-building": BMSHeroSection,
  "electro-mechanical-works": EMWHeroSection,
  "civil-general-construction": CGCHeroSection,
  "fleet-management": FleetManagementHeroSection,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) return {};
  return generateSeoMetadata(service.title, service);
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service || !service.published) notFound();

  const HeroComp = heroMap[slug];
  const heroData = {
    heroTitle: service.heroTitle,
    heroSubtitle: service.heroSubtitle || undefined,
  };
  const isFleet = slug === "fleet-management";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const offers = (service.offers as any[]) || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const features = (service.features as any[]) || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const howItWorks = (service.howItWorks as any[]) || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawStats = service.stats as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statsData = Array.isArray(rawStats)
    ? { stats: rawStats }
    : { label: rawStats?.label, heading: rawStats?.heading, subtext: rawStats?.subtext, bgImage: rawStats?.bgImage, stats: rawStats?.items || [] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const industries = (service.industries as any[]) || [];

  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />

      {/* Hero — each service has a unique SVG illustration */}
      {HeroComp ? (
        <HeroComp data={heroData} />
      ) : (
        <ServiceHeroSection
          title={service.heroTitle}
          description={service.heroSubtitle || ""}
        />
      )}

      {/* Body sections — generic layout, data from DB */}
      {offers.length > 0 && (
        <ServiceOffersSection
          data={{ label: service.title, offers }}
        />
      )}
      {features.length > 0 && (
        <ServiceFeaturesSection data={{ features }} />
      )}
      {howItWorks.length > 0 && (
        <ServiceHowItWorksSection data={{ steps: howItWorks }} />
      )}

      {/* Fleet-unique: Dashboard */}
      {isFleet && <FleetDashboardSection />}

      {statsData.stats.length > 0 && (
        <ServiceStatsSection data={statsData} />
      )}
      {industries.length > 0 && (
        <ServiceIndustriesSection data={{ industries }} />
      )}

      {/* Fleet-unique: Tech & Pricing */}
      {isFleet && <FleetTechSection />}
      {isFleet && <FleetPricingSection />}

      <EnquirySection />
      <Footer />
    </main>
  );
}
