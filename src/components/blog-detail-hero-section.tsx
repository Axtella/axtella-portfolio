"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { BlogPost } from "@/types/blog";

interface BlogDetailHeroSectionProps {
  blog: BlogPost;
}

export function BlogDetailHeroSection({ blog }: BlogDetailHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  // Format date to display format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline animation - word by word
      const words = headlineRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(words, {
          y: 100,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          delay: 0.2,
          ease: "power4.out",
        });
      }

      // Meta info animation
      gsap.fromTo(metaRef.current, {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.6,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split title into words for animation
  const titleWords = blog.title.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#080D1A]"
      style={{ minHeight: "600px", paddingTop: "140px", paddingBottom: "80px" }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('/images/home/dot paatern.png')`,
            backgroundRepeat: "repeat",
          }}
        />
        {/* Green gradient glow */}
        <div className="absolute bottom-0 left-1/4 w-[min(600px,80vw)] h-[min(400px,60vh)] bg-[#F5A623]/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[min(400px,60vw)] h-[min(300px,40vh)] bg-[#F5A623]/5 blur-[120px] rounded-full" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1238px]">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-extrabold uppercase mb-12 md:mb-16"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(32px, 4.3vw, 82px)",
              lineHeight: "0.93",
              letterSpacing: "-0.02em",
            }}
          >
            {titleWords.map((word, index) => (
              <span key={index} className="word inline-block text-white mr-[0.3em]">
                {word}
              </span>
            ))}
          </h1>

          {/* Meta Info Row */}
          <div
            ref={metaRef}
            className="flex flex-wrap gap-8 md:gap-16 lg:gap-20"
          >
            {/* Author Group */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-700">
                {blog.author.avatar ? (
                  <Image
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-lg font-semibold">
                    {blog.author.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p
                  className="text-white font-medium"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "clamp(14px, 1.5vw, 16px)",
                  }}
                >
                  {blog.author.name}
                </p>
                <p
                  className="text-white/60"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "clamp(12px, 1.2vw, 14px)",
                  }}
                >
                  {blog.author.role}
                </p>
              </div>
            </div>

            {/* Category Group */}
            <div>
              <p
                className="text-white font-medium"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "clamp(14px, 1.5vw, 16px)",
                }}
              >
                {blog.category}
              </p>
              <p
                className="text-white/60"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "clamp(12px, 1.2vw, 14px)",
                }}
              >
                Category
              </p>
            </div>

            {/* Date Group */}
            <div>
              <p
                className="text-white font-medium"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "clamp(14px, 1.5vw, 16px)",
                }}
              >
                {formatDate(blog.publishedDate)}
              </p>
              <p
                className="text-white/60"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "clamp(12px, 1.2vw, 14px)",
                }}
              >
                Post Date
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
