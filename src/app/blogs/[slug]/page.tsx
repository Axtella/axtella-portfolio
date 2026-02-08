"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import {
  Navbar,
  BlogDetailHeroSection,
  BlogContentSection,
  RelatedBlogsSection,
  EnquirySection,
  Footer,
} from "@/components";
import { getBlogBySlug } from "@/data/blogs";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Get blog data by slug
  // In future, this will be fetched from backend API
  const blog = getBlogBySlug(slug);

  // If blog not found, show 404
  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <BlogDetailHeroSection blog={blog} />
      <BlogContentSection blog={blog} />
      <RelatedBlogsSection currentSlug={slug} />
      <EnquirySection />
      <Footer />
    </main>
  );
}
