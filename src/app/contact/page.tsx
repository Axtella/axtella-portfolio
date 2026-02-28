import {
  ContactHeroSection,
  ContactInfoSection,
  ContactFormSection,
  FAQSection,
  Footer
} from "@/components";
import { NavbarServer as Navbar } from "@/components/navbar-server";
import { getPageData, getSection } from "@/lib/page-data";
import { generateSeoMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("contact");
  return generateSeoMetadata("Contact", page);
}

export default async function Contact() {
  const page = await getPageData("contact");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = (page?.sections as any[]) || [];

  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <ContactHeroSection data={getSection(sections, "hero")} />
      <ContactInfoSection data={getSection(sections, "contact-info")} />
      <ContactFormSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
