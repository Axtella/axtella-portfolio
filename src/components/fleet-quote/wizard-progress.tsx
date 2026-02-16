"use client";

import { cn } from "@/lib/utils";

const steps = [
  { number: 1, label: "Company" },
  { number: 2, label: "Fleet" },
  { number: 3, label: "Services" },
  { number: 4, label: "Requirements" },
  { number: 5, label: "Submit" },
];

interface WizardProgressProps {
  currentStep: number;
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 w-full max-w-2xl mx-auto">
      {steps.map((step, i) => {
        const isCompleted = currentStep > step.number;
        const isCurrent = currentStep === step.number;
        const isUpcoming = currentStep < step.number;

        return (
          <div key={step.number} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                  isCompleted && "bg-[#F5A623] text-black",
                  isCurrent &&
                    "bg-[#F5A623]/20 border-2 border-[#F5A623] text-[#F5A623]",
                  isUpcoming &&
                    "bg-white/5 border border-white/15 text-gray-500"
                )}
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {isCompleted ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8L6.5 11.5L13 4.5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] sm:text-xs mt-1.5 font-medium transition-colors",
                  isCurrent ? "text-[#F5A623]" : isCompleted ? "text-gray-400" : "text-gray-600"
                )}
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "h-[2px] w-8 sm:w-12 lg:w-16 mx-1 sm:mx-2 mb-5 rounded-full transition-colors duration-300",
                  currentStep > step.number + 1
                    ? "bg-[#F5A623]"
                    : currentStep > step.number
                      ? "bg-[#F5A623]/50"
                      : "bg-white/10"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
