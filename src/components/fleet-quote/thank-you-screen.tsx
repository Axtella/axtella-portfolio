"use client";

import Link from "next/link";

interface ThankYouScreenProps {
  referenceNumber: string;
}

export function ThankYouScreen({ referenceNumber }: ThankYouScreenProps) {
  return (
    <div className="max-w-xl mx-auto px-6 py-12 text-center">
      <div
        className="rounded-2xl p-8 sm:p-10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        {/* Checkmark Circle */}
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-full border-2 border-[#F5A623] flex items-center justify-center"
            style={{ background: "rgba(245, 166, 35, 0.08)" }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 18L15 25L28 11"
                stroke="#F5A623"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2
          className="text-2xl sm:text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Thank You! Your Quote Request Has Been Submitted
        </h2>

        {/* Subtext */}
        <p
          className="text-gray-400 text-sm sm:text-base mb-6"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Our fleet specialist will contact you within 24 hours with a
          customized proposal.
        </p>

        {/* Reference Number */}
        <div
          className="inline-block rounded-lg px-6 py-3 mb-6"
          style={{ background: "rgba(245, 166, 35, 0.1)" }}
        >
          <span
            className="text-sm font-semibold text-[#F5A623]"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Reference #: {referenceNumber}
          </span>
        </div>

        {/* Contact Info */}
        <p
          className="text-gray-500 text-xs mb-8"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          For urgent inquiries: +966 55 732 3274
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/services/fleet-management"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold border border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623]/10 transition-colors duration-200 w-full sm:w-auto"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Back to Fleet Management
          </Link>
          <Link
            href="/services/telecommunication-solutions"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-[#F5A623] text-[#080D1A] hover:bg-[#D4910A] transition-colors duration-200 w-full sm:w-auto"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </div>
  );
}
