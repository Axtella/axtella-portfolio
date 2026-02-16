"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlogPost } from "@/types/blog";

gsap.registerPlugin(ScrollTrigger);

interface RelatedBlogsSectionProps {
  blogs: BlogPost[];
}

export function RelatedBlogsSection({ blogs }: RelatedBlogsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current, {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll(".related-card");
      if (cards) {
        gsap.fromTo(cards, {
          y: 60,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2
          ref={headerRef}
          className="mb-12 md:mb-16"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontWeight: 800,
            fontSize: "clamp(28px, 3.1vw, 60px)",
            lineHeight: "1.03",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: "#0E150E",
          }}
        >
          Related Blogs
        </h2>

        {/* Related Blog Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
        >
          {blogs.map((blog) => (
            <RelatedBlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedBlogCard({ blog }: { blog: BlogPost }) {
  return (
    <a href={`/blogs/${blog.slug}`} className="related-card group block">
      {/* Image Container */}
      <div
        className="relative w-full overflow-hidden rounded-xl mb-6"
        style={{
          height: "clamp(250px, 20.8vw, 399px)",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${blog.image}')`,
            backgroundColor: "#d1d5db",
            borderRadius: "12px",
          }}
        />
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Title */}
        <h3
          className="text-black font-bold"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontWeight: 700,
            fontSize: "clamp(20px, 1.82vw, 35px)",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
          }}
        >
          {blog.title}
        </h3>

        {/* Description */}
        <p
          className="text-gray-600"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "clamp(14px, 1.5vw, 16px)",
            lineHeight: "1.6",
          }}
        >
          {blog.description}
        </p>

        {/* Green Accent Line */}
        <div
          className="w-full h-1 mt-4 rounded-full"
          style={{
            background: "linear-gradient(90deg, #F5A623 0%, #F5A623 100%)",
          }}
        />
      </div>
    </a>
  );
}
