"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import {
  type FleetQuoteFormData,
  defaultFormData,
  stepSchemas,
} from "@/lib/validations/fleet-quote";
import { useLocalStorageForm } from "@/hooks/use-local-storage-form";
import { WizardProgress } from "./wizard-progress";
import { StepCompanyInfo } from "./step-company-info";
import { StepFleetDetails } from "./step-fleet-details";
import { StepServicesRequired } from "./step-services-required";
import { StepRequirements } from "./step-requirements";
import { StepPreferencesSubmit } from "./step-preferences-submit";
import { ThankYouScreen } from "./thank-you-screen";

const STORAGE_KEY = "axtella-fleet-quote-draft";

export function FleetQuoteWizard() {
  const { formData, setFormData, clearSavedData } =
    useLocalStorageForm<FleetQuoteFormData>(STORAGE_KEY, defaultFormData);

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<
    Record<string, string[] | string | undefined>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [submitError, setSubmitError] = useState("");

  const stepRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const updateField = useCallback(
    (field: string, value: unknown) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error for this field when user types
      setErrors((prev) => {
        if (prev[field]) {
          const next = { ...prev };
          delete next[field];
          return next;
        }
        return prev;
      });
    },
    [setFormData]
  );

  const validateCurrentStep = (): boolean => {
    const schema = stepSchemas[currentStep - 1];
    if (!schema) return true;

    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const mapped: Record<string, string[]> = {};
      for (const [key, val] of Object.entries(fieldErrors)) {
        if (val) mapped[key] = val;
      }
      setErrors(mapped);
      return false;
    }

    setErrors({});
    return true;
  };

  const animateTransition = (direction: "next" | "prev", callback: () => void) => {
    if (isAnimating.current || !stepRef.current) {
      callback();
      return;
    }
    isAnimating.current = true;

    const xOut = direction === "next" ? -40 : 40;
    const xIn = direction === "next" ? 40 : -40;

    gsap.to(stepRef.current, {
      x: xOut,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        callback();
        if (stepRef.current) {
          gsap.fromTo(
            stepRef.current,
            { x: xIn, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                isAnimating.current = false;
              },
            }
          );
        } else {
          isAnimating.current = false;
        }
      },
    });
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (currentStep < 5) {
      animateTransition("next", () => setCurrentStep((s) => s + 1));
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setErrors({});
      animateTransition("prev", () => setCurrentStep((s) => s - 1));
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/fleet-quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setSubmitError(data.error || "Failed to submit. Please try again.");
        return;
      }

      const data = await res.json();
      setReferenceNumber(data.referenceNumber);
      clearSavedData();
      setIsSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  if (isSubmitted) {
    return (
      <section className="relative w-full py-20 sm:py-24 lg:py-28">
        <ThankYouScreen referenceNumber={referenceNumber} />
      </section>
    );
  }

  const stepProps = { formData, updateField, errors };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-white font-bold"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(24px, 3vw, 36px)",
              lineHeight: "1.2",
            }}
          >
            Get a Free Quote
          </h1>
          <p
            className="text-gray-400 mt-3"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(14px, 1.2vw, 16px)",
            }}
          >
            Tell us about your fleet — we&apos;ll design the perfect solution
          </p>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <WizardProgress currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <div
          ref={stepRef}
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10"
        >
          {currentStep === 1 && <StepCompanyInfo {...stepProps} />}
          {currentStep === 2 && <StepFleetDetails {...stepProps} />}
          {currentStep === 3 && <StepServicesRequired {...stepProps} />}
          {currentStep === 4 && <StepRequirements {...stepProps} />}
          {currentStep === 5 && <StepPreferencesSubmit {...stepProps} />}
        </div>

        {/* Submit Error */}
        {submitError && (
          <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
            <p className="text-sm text-red-400">{submitError}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-400 hover:text-white hover:bg-white/5 border border-white/10"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            <span>←</span> Back
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-200 bg-[#F5A623] text-black hover:bg-[#D4910A] hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Next <span>→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-200 bg-[#F5A623] text-black hover:bg-[#D4910A] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="opacity-75"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>Submit Quote Request <span>→</span></>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
