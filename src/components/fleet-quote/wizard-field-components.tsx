"use client";

import { cn } from "@/lib/utils";

interface FieldError {
  errors: Record<string, string[] | string | undefined>;
  name: string;
}

function getError({ errors, name }: FieldError): string | undefined {
  const err = errors[name];
  if (Array.isArray(err)) return err[0];
  return err;
}

// ─── Text / Email / Phone Input ──────────────────────────────

interface WizardInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  errors: Record<string, string[] | string | undefined>;
}

export function WizardInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  errors,
}: WizardInputProps) {
  const error = getError({ errors, name });
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-300 mb-1.5"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        {label}
        {required && <span className="text-[#F5A623] ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-3 rounded-lg text-sm text-white placeholder-gray-500",
          "bg-white/5 border transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[#F5A623]/40 focus:border-[#F5A623]",
          error ? "border-red-500" : "border-white/10 hover:border-white/20"
        )}
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

// ─── Select Dropdown ─────────────────────────────────────────

interface WizardSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  errors: Record<string, string[] | string | undefined>;
}

export function WizardSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select...",
  required,
  errors,
}: WizardSelectProps) {
  const error = getError({ errors, name });
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-300 mb-1.5"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        {label}
        {required && <span className="text-[#F5A623] ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full px-4 py-3 rounded-lg text-sm text-white",
          "bg-white/5 border transition-colors duration-200 appearance-none",
          "focus:outline-none focus:ring-2 focus:ring-[#F5A623]/40 focus:border-[#F5A623]",
          error ? "border-red-500" : "border-white/10 hover:border-white/20",
          !value && "text-gray-500"
        )}
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        <option value="" className="bg-[#0f1729] text-gray-500">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-[#0f1729] text-white"
          >
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

// ─── Radio Group ─────────────────────────────────────────────

interface WizardRadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; description?: string }[];
  required?: boolean;
  columns?: number;
  errors: Record<string, string[] | string | undefined>;
}

export function WizardRadioGroup({
  label,
  name,
  value,
  onChange,
  options,
  required,
  columns = 3,
  errors,
}: WizardRadioGroupProps) {
  const error = getError({ errors, name });
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-300 mb-3"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        {label}
        {required && <span className="text-[#F5A623] ml-1">*</span>}
      </label>
      <div
        className={cn(
          "grid gap-3",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-2 lg:grid-cols-4"
        )}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "px-4 py-3 rounded-lg text-left text-sm transition-all duration-200 border",
              value === opt.value
                ? "bg-[#F5A623]/10 border-[#F5A623] text-white"
                : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/8"
            )}
          >
            <span
              className="font-medium block"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {opt.label}
            </span>
            {opt.description && (
              <span className="text-xs text-gray-500 mt-1 block">
                {opt.description}
              </span>
            )}
          </button>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

// ─── Checkbox Group (Multi-Select) ───────────────────────────

interface WizardCheckboxGroupProps {
  label: string;
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  columns?: number;
  errors: Record<string, string[] | string | undefined>;
}

export function WizardCheckboxGroup({
  label,
  name,
  value,
  onChange,
  options,
  required,
  columns = 2,
  errors,
}: WizardCheckboxGroupProps) {
  const error = getError({ errors, name });

  const toggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-300 mb-3"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        {label}
        {required && <span className="text-[#F5A623] ml-1">*</span>}
      </label>
      <div
        className={cn(
          "grid gap-2",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {options.map((opt) => {
          const checked = value.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 border text-left",
                checked
                  ? "bg-[#F5A623]/10 border-[#F5A623]/50 text-white"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/8"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-all",
                  checked
                    ? "bg-[#F5A623] border-[#F5A623]"
                    : "border-white/20 bg-transparent"
                )}
              >
                {checked && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

// ─── Textarea ────────────────────────────────────────────────

interface WizardTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  errors: Record<string, string[] | string | undefined>;
}

export function WizardTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  rows = 4,
  errors,
}: WizardTextareaProps) {
  const error = getError({ errors, name });
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-300 mb-1.5"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        {label}
        {required && <span className="text-[#F5A623] ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "w-full px-4 py-3 rounded-lg text-sm text-white placeholder-gray-500 resize-none",
          "bg-white/5 border transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[#F5A623]/40 focus:border-[#F5A623]",
          error ? "border-red-500" : "border-white/10 hover:border-white/20"
        )}
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

// ─── Single Checkbox ─────────────────────────────────────────

interface WizardCheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  errors: Record<string, string[] | string | undefined>;
}

export function WizardCheckbox({
  label,
  name,
  checked,
  onChange,
  required,
  errors,
}: WizardCheckboxProps) {
  const error = getError({ errors, name });
  return (
    <div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="flex items-start gap-3 text-left"
      >
        <div
          className={cn(
            "w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border mt-0.5 transition-all",
            checked
              ? "bg-[#F5A623] border-[#F5A623]"
              : "border-white/20 bg-transparent"
          )}
        >
          {checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6L5 9L10 3"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span
          className="text-sm text-gray-300"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          {label}
          {required && <span className="text-[#F5A623] ml-1">*</span>}
        </span>
      </button>
      {error && (
        <p className="mt-1 ml-8 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
