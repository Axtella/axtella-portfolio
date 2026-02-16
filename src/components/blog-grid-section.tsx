"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types/blog";

gsap.registerPlugin(ScrollTrigger);

interface BlogGridSectionProps {
  blogs: BlogPost[];
  categories: string[];
}

export function BlogGridSection({ blogs, categories }: BlogGridSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredArticles =
    activeCategory === "All"
      ? blogs
      : blogs.filter((article) => article.category?.name === activeCategory);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".blog-card");
      if (cards) {
        gsap.fromTo(cards, {
          y: 60,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
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

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 md:py-24">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Buttons */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div
            className="flex flex-wrap justify-center gap-3 md:gap-4"
            style={{ maxWidth: "766px" }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 md:px-8 rounded-full transition-all duration-300",
                  activeCategory === category
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300 hover:border-gray-400"
                )}
                style={{
                  height: "clamp(48px, 3.6vw, 69px)",
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 500,
                  fontSize: "clamp(14px, 1.15vw, 22px)",
                  lineHeight: "1.9",
                  letterSpacing: "-0.02em",
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
        >
          {filteredArticles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ article }: { article: BlogPost }) {
  return (
    <a
      href={`/blogs/${article.slug}`}
      className="blog-card group block"
    >
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
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${article.image}')`,
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
          {article.title}
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
          {article.description}
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
