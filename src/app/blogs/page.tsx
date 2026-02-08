"use client";

import {
  Navbar,
  BlogHeroSection,
  BlogGridSection,
  EnquirySection,
  Footer
} from "@/components";

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <BlogHeroSection />
      <BlogGridSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}
