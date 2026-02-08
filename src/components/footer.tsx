"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-[#161616] text-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div>
          {/* Top Section - Social Media & Contact Info */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12 mb-12">
            {/* Left - Social Media */}
            <div>
              <h3
                className="text-white mb-6"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "clamp(18px, 3vw, 24px)",
                  fontWeight: 500,
                }}
              >
                Stay connected with us
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-white/5 hover:bg-[#F5A623] flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-white/5 hover:bg-[#F5A623] flex items-center justify-center transition-all duration-300"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-white/5 hover:bg-[#F5A623] flex items-center justify-center transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-white/5 hover:bg-[#F5A623] flex items-center justify-center transition-all duration-300"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right - Contact Info */}
            <div
              className="text-left lg:text-right space-y-4 w-full lg:w-auto lg:max-w-[514px]"
            >
              {/* Address - Group 120 */}
              <p
                className="text-white/70"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "clamp(12px, 1.5vw, 14px)",
                  lineHeight: "1.6",
                }}
              >
                Office 12, Al Quoz Business Center,
                <br />
                P.O. Box 00000, Dubai, UAE
              </p>

              {/* Email - Group 126 */}
              <div className="min-h-[64px]">
                <p
                  className="text-[#F5A623] mb-1"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "12px",
                    letterSpacing: "0.5px",
                  }}
                >
                  EMAIL US DIRECTLY
                </p>
                <a
                  href="mailto:info@axtella.com"
                  className="text-white hover:text-[#F5A623] transition-colors"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "clamp(14px, 2vw, 16px)",
                  }}
                >
                  info@axtella.com
                </a>
              </div>

              {/* Phone - Group 125 */}
              <div className="min-h-[64px]">
                <p
                  className="text-[#F5A623] mb-1"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "12px",
                    letterSpacing: "0.5px",
                  }}
                >
                  CALL US DIRECTLY
                </p>
                <a
                  href="tel:+97140000000"
                  className="text-white hover:text-[#F5A623] transition-colors"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "clamp(14px, 2vw, 16px)",
                  }}
                >
                  +971 4 000 0000
                </a>
              </div>
            </div>
          </div>

          {/* Horizontal Separator Line */}
          <div
            className="mb-6 w-full lg:max-w-[618px]"
            style={{
              height: "1px",
              background: "rgba(255, 255, 255, 0.1)",
            }}
          />

          {/* Navigation Links */}
          <nav className="mb-6">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <Link
                href="/"
                className="text-[#C2C2C2] hover:text-[#F5A623] transition-colors"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 500,
                  fontSize: "clamp(14px, 2vw, 18px)",
                  lineHeight: "1.2",
                  letterSpacing: "1px",
                }}
              >
                Home
              </Link>
              <span
                className="text-white/30 cursor-not-allowed"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 500,
                  fontSize: "clamp(14px, 2vw, 18px)",
                  lineHeight: "1.2",
                  letterSpacing: "1px",
                }}
              >
                About
              </span>
              <span
                className="text-white/30 cursor-not-allowed"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 500,
                  fontSize: "clamp(14px, 2vw, 18px)",
                  lineHeight: "1.2",
                  letterSpacing: "1px",
                }}
              >
                Blogs
              </span>
              <span
                className="text-white/30 cursor-not-allowed"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 500,
                  fontSize: "clamp(14px, 2vw, 18px)",
                  lineHeight: "1.2",
                  letterSpacing: "1px",
                }}
              >
                Contact
              </span>
            </div>
          </nav>

          {/* Logo & Copyright */}
          <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4 pt-8 border-t border-white/10">
            <Image
              src="/logo1.png"
              alt="Axtella Global"
              width={260}
              height={70}
              className="h-12 lg:h-14 xl:h-[60px]"
              style={{ width: "auto", background: "transparent" }}
            />
            <p
              className="text-white/50 text-xs sm:text-sm"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
              }}
            >
              Copyright © 2026 Axtella. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
