import { notFound } from "next/navigation";
import {
  Navbar,
  BlogDetailHeroSection,
  BlogContentSection,
  RelatedBlogsSection,
  EnquirySection,
  Footer,
} from "@/components";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/blog-queries";
import { BlogPost } from "@/types/blog";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog || !blog.published) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(slug, blog.categoryId, 2);

  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <BlogDetailHeroSection blog={blog as unknown as BlogPost} />
      <BlogContentSection blog={blog as unknown as BlogPost} />
      <RelatedBlogsSection blogs={relatedBlogs as unknown as BlogPost[]} />
      <EnquirySection />
      <Footer />
    </main>
  );
}
