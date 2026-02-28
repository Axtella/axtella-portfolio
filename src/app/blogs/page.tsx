import {
  BlogHeroSection,
  BlogGridSection,
  EnquirySection,
  Footer,
} from "@/components";
import { NavbarServer as Navbar } from "@/components/navbar-server";
import { getPublishedBlogs, getBlogCategories } from "@/lib/blog-queries";
import { BlogPost } from "@/types/blog";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const [blogs, categories] = await Promise.all([
    getPublishedBlogs(),
    getBlogCategories(),
  ]);

  const categoryNames = ["All", ...categories.map((c) => c.name)];

  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <BlogHeroSection />
      <BlogGridSection
        blogs={blogs as unknown as BlogPost[]}
        categories={categoryNames}
      />
      <EnquirySection />
      <Footer />
    </main>
  );
}
