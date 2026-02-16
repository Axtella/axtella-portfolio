"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar, Footer } from "@/components";
import { ArrowLeft, Upload, FileText, X, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ALLOWED_CV_EXTENSIONS } from "@/lib/validations/job-application";

const ACCEPTED_TYPES =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#080D1A]">
          <Navbar />
          <div className="pt-32 pb-20 text-center">
            <p className="text-gray-400">Loading...</p>
          </div>
          <Footer />
        </main>
      }
    >
      <ApplyPageContent />
    </Suspense>
  );
}

function ApplyPageContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId") || "";
  const formRef = useRef<HTMLDivElement>(null);

  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Fetch job title
  useEffect(() => {
    if (!jobId) {
      setLoading(false);
      return;
    }
    fetch(`/api/jobs/${jobId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((job) => {
        setJobTitle(job.title);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [jobId]);

  // GSAP entrance animation
  useEffect(() => {
    if (loading || !formRef.current) return;
    gsap.fromTo(
      formRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, [loading, submitted]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      if (ALLOWED_CV_EXTENSIONS.includes(ext)) {
        setCvFile(file);
      } else {
        setError("Only PDF, DOC, and DOCX files are accepted");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!cvFile) {
      setError("Please upload your CV");
      return;
    }

    if (cvFile.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("coverLetter", coverLetter);
    formData.append("cv", cvFile);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit application");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080D1A]">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <p className="text-gray-400">Loading...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!jobId || !jobTitle) {
    return (
      <main className="min-h-screen bg-[#080D1A]">
        <Navbar />
        <div className="pt-32 pb-20 text-center max-w-xl mx-auto px-4">
          <h1
            className="text-2xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Position Not Found
          </h1>
          <p
            className="text-gray-400 mb-8"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            The position you&apos;re looking for may no longer be available.
          </p>
          <Link
            href="/careers#open-positions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-[#F5A623] text-[#080D1A] hover:bg-[#D4910A] transition-colors"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            View Open Positions
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Success screen
  if (submitted) {
    return (
      <main className="min-h-screen bg-[#080D1A]">
        <Navbar />
        <div className="pt-32 pb-20" ref={formRef}>
          <div className="max-w-xl mx-auto px-6 text-center">
            <div
              className="rounded-2xl p-8 sm:p-10"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex justify-center mb-6">
                <div
                  className="w-20 h-20 rounded-full border-2 border-[#F5A623] flex items-center justify-center"
                  style={{ background: "rgba(245, 166, 35, 0.08)" }}
                >
                  <CheckCircle className="w-9 h-9 text-[#F5A623]" />
                </div>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Application Submitted!
              </h2>
              <p
                className="text-gray-400 text-sm sm:text-base mb-4"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Thank you for applying for <strong className="text-white">{jobTitle}</strong>.
                Our HR team will review your application and get back to you soon.
              </p>
              <p
                className="text-gray-500 text-xs mb-8"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                For inquiries: careers@axtellaglobal.com
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/careers#open-positions"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold border border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623]/10 transition-colors w-full sm:w-auto"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  View More Positions
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-[#F5A623] text-[#080D1A] hover:bg-[#D4910A] transition-colors w-full sm:w-auto"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080D1A]">
      <Navbar />
      <div className="pt-32 pb-20" ref={formRef}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/careers#open-positions"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#F5A623] transition-colors mb-6"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            <ArrowLeft size={16} />
            Back to Open Positions
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[2px] bg-[#F5A623]" />
              <span
                className="text-[#F5A623] uppercase text-xs tracking-[2px] font-medium"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Apply Now
              </span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{
                fontFamily: "var(--font-montserrat)",
                letterSpacing: "-0.02em",
              }}
            >
              {jobTitle}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-1.5"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 focus:border-transparent transition-all"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-300 mb-1.5"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 focus:border-transparent transition-all"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-300 mb-1.5"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  Phone <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 5X XXX XXXX"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 focus:border-transparent transition-all"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                />
              </div>
            </div>

            {/* CV Upload */}
            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-1.5"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Upload CV <span className="text-red-400">*</span>
              </label>
              {cvFile ? (
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-[#F5A623]/30 rounded-lg">
                  <FileText size={20} className="text-[#F5A623] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{cvFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(cvFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCvFile(null)}
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`relative flex flex-col items-center gap-2 px-4 py-8 border-2 border-dashed rounded-lg transition-all cursor-pointer ${
                    dragOver
                      ? "border-[#F5A623] bg-[#F5A623]/5"
                      : "border-white/10 hover:border-[#F5A623]/40"
                  }`}
                >
                  <Upload
                    size={24}
                    className={dragOver ? "text-[#F5A623]" : "text-gray-500"}
                  />
                  <p
                    className="text-sm text-gray-400"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    Drag & drop your CV here, or{" "}
                    <span className="text-[#F5A623] font-medium">browse</span>
                  </p>
                  <p className="text-xs text-gray-600">
                    PDF, DOC, DOCX — Max 5MB
                  </p>
                  <input
                    type="file"
                    accept={ACCEPTED_TYPES}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setCvFile(file);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Cover Letter */}
            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-1.5"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Cover Letter{" "}
                <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={5}
                placeholder="Tell us why you're a great fit for this role..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 focus:border-transparent transition-all resize-none"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#F5A623] hover:bg-[#D4910A] text-[#080D1A] text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
