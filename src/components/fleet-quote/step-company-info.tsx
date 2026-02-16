"use client";

import type { FleetQuoteFormData } from "@/lib/validations/fleet-quote";
import { WizardInput, WizardSelect } from "./wizard-field-components";

interface StepProps {
  formData: FleetQuoteFormData;
  updateField: (field: string, value: unknown) => void;
  errors: Record<string, string[] | string | undefined>;
}

const industryOptions = [
  { value: "logistics", label: "Logistics & Delivery" },
  { value: "construction", label: "Construction" },
  { value: "corporate", label: "Corporate / Office Fleet" },
  { value: "public-transport", label: "Public Transport" },
  { value: "government", label: "Government" },
  { value: "oil-gas", label: "Oil & Gas" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "agriculture", label: "Agriculture" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "other", label: "Other" },
];

const cityOptions = [
  { value: "riyadh", label: "Riyadh" },
  { value: "jeddah", label: "Jeddah" },
  { value: "dammam", label: "Dammam" },
  { value: "makkah", label: "Makkah" },
  { value: "madinah", label: "Madinah" },
  { value: "tabuk", label: "Tabuk" },
  { value: "abha", label: "Abha" },
  { value: "other", label: "Other" },
];

export function StepCompanyInfo({ formData, updateField, errors }: StepProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          About Your Company
        </h2>
        <p
          className="text-gray-400 text-sm"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Tell us a bit about your organization so we can tailor the best fleet
          solution for you.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Company Name — full width */}
        <WizardInput
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={(v) => updateField("companyName", v)}
          placeholder="Enter your company name"
          required
          errors={errors}
        />

        {/* Industry + City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <WizardSelect
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={(v) => updateField("industry", v)}
            options={industryOptions}
            placeholder="Select your industry"
            required
            errors={errors}
          />
          <WizardSelect
            label="City"
            name="city"
            value={formData.city}
            onChange={(v) => updateField("city", v)}
            options={cityOptions}
            placeholder="Select your city"
            required
            errors={errors}
          />
        </div>

        {/* Contact Person + Job Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <WizardInput
            label="Contact Person"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={(v) => updateField("contactPerson", v)}
            placeholder="Full name"
            required
            errors={errors}
          />
          <WizardInput
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={(v) => updateField("jobTitle", v)}
            placeholder="e.g. Fleet Manager"
            errors={errors}
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <WizardInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(v) => updateField("email", v)}
            placeholder="name@company.com"
            required
            errors={errors}
          />
          <WizardInput
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(v) => updateField("phone", v)}
            placeholder="+966 5X XXX XXXX"
            required
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
