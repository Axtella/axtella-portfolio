import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FleetQuoteWizard } from "@/components/fleet-quote/fleet-quote-wizard";

export const metadata: Metadata = {
  title: "Fleet Management Quote | Axtella",
  description:
    "Request a custom fleet management quote. Tell us about your fleet and we'll design the perfect GPS tracking and fleet management solution for your business.",
};

export default function FleetQuotePage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <FleetQuoteWizard />
      <Footer />
    </main>
  );
}
