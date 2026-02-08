"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CorporateVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(videoRef.current, {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoPlayerRef.current?.play();
    }, 0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-12 lg:py-20"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={videoRef}
          className="relative w-full overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl"
          style={{ aspectRatio: "16/9" }}
        >
          {!isPlaying ? (
            /* Video Thumbnail with Play Button */
            <div
              className="absolute inset-0 cursor-pointer group"
              onClick={handlePlay}
            >
              {/* Thumbnail Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/images/corporate/video-thumbnail.jpg')`,
                  backgroundColor: "#1a1a1a",
                }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/40" />

              {/* Logo */}
              <div className="absolute top-6 left-6 lg:top-10 lg:left-10 flex items-center gap-2">
                <img
                  src="/images/home/logo.png"
                  alt="Axtella"
                  className="h-6 lg:h-8 w-auto"
                />
              </div>

              {/* Title */}
              <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10">
                <h3
                  className="text-white font-extrabold uppercase"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "clamp(24px, 4vw, 48px)",
                    lineHeight: "1",
                    letterSpacing: "-0.02em",
                  }}
                >
                  CORPORATE
                  <br />
                  TRAINING
                </h3>
              </div>

              {/* Masterclass text */}
              <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10">
                <span
                  className="text-white font-medium italic"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(20px, 3vw, 36px)",
                  }}
                >
                  Masterclass
                </span>
              </div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 lg:w-10 lg:h-10 text-black ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            /* Video Player */
            <video
              ref={videoPlayerRef}
              className="absolute inset-0 w-full h-full object-cover"
              src="/21APRIL_2.MOV"
              controls
              playsInline
            />
          )}
        </div>
      </div>
    </section>
  );
}
