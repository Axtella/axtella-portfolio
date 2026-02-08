"use client";

import { cn } from "@/lib/utils";

interface LoginRegisterButtonProps {
  className?: string;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export function LoginRegisterButton({
  className,
  onLoginClick,
  onRegisterClick,
}: LoginRegisterButtonProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "w-full sm:w-[223px]",
        "transition-all duration-300",
        className
      )}
      style={{
        background: "#1A1A1A",
        boxShadow: "0px 4px 43px 1px rgba(0, 0, 0, 0.08)",
        borderRadius: "53px",
        height: "clamp(55px, 4.41vw, 79px)",
      }}
    >
      {/* Login Button */}
      <button
        onClick={onLoginClick}
        className="font-[family-name:var(--font-plus-jakarta)] font-semibold text-base sm:text-lg text-white hover:text-[#F5A623] transition-colors duration-200 px-3 sm:px-4 outline-none"
        type="button"
      >
        Login
      </button>

      {/* Divider */}
      <div className="w-px h-8 sm:h-10 bg-white/40 rounded-full" />

      {/* Register Button */}
      <button
        onClick={onRegisterClick}
        className="font-[family-name:var(--font-plus-jakarta)] font-semibold text-base sm:text-lg text-white hover:text-[#F5A623] transition-colors duration-200 px-3 sm:px-4 outline-none"
        type="button"
      >
        Register
      </button>
    </div>
  );
}
