"use client";

import type { FleetQuoteFormData } from "@/lib/validations/fleet-quote";
import {
  WizardInput,
  WizardSelect,
  WizardRadioGroup,
  WizardCheckboxGroup,
} from "./wizard-field-components";

interface StepProps {
  formData: FleetQuoteFormData;
  updateField: (field: string, value: unknown) => void;
  errors: Record<string, string[] | string | undefined>;
}

const challengeOptions = [
  { value: "high-fuel-costs", label: "High fuel costs" },
  { value: "driver-safety", label: "Driver safety concerns" },
  { value: "unauthorized-use", label: "Unauthorized vehicle use" },
  { value: "no-visibility", label: "No real-time fleet visibility" },
  {
    value: "maintenance-breakdowns",
    label: "Frequent maintenance breakdowns",
  },
  { value: "route-inefficiency", label: "Inefficient routes" },
  { value: "compliance", label: "Regulatory compliance issues" },
  { value: "cargo-theft", label: "Cargo theft or damage" },
  { value: "poor-delivery", label: "Poor customer delivery experience" },
  { value: "other", label: "Other" },
];

const integrationOptions = [
  { value: "erp", label: "ERP (SAP, Oracle, etc.)" },
  { value: "crm", label: "CRM (Salesforce, etc.)" },
  { value: "fuel-card", label: "Fuel card provider" },
  { value: "tms", label: "Logistics / TMS software" },
  { value: "government", label: "Government / regulatory portals" },
  { value: "accounting", label: "Accounting software" },
  { value: "none", label: "No integrations needed" },
];

const budgetOptions = [
  { value: "under-5000", label: "Under SAR 5,000/month" },
  { value: "5000-15000", label: "SAR 5,000 - 15,000/month" },
  { value: "15000-50000", label: "SAR 15,000 - 50,000/month" },
  { value: "50000-100000", label: "SAR 50,000 - 100,000/month" },
  { value: "100000-plus", label: "SAR 100,000+/month" },
  { value: "not-sure", label: "Not sure yet \u2014 need guidance" },
];

const timelineOptions = [
  { value: "immediately", label: "Immediately (within 2 weeks)" },
  { value: "1-month", label: "Within 1 month" },
  { value: "3-months", label: "Within 3 months" },
  { value: "exploring", label: "Just exploring options" },
  { value: "specific-date", label: "Specific date" },
];

export function StepRequirements({ formData, updateField, errors }: StepProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Your Requirements
        </h2>
        <p
          className="text-gray-400 text-sm"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Let us know your challenges, integration needs, and timeline so we can
          prioritize what matters most.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <WizardCheckboxGroup
          label="What are your biggest fleet challenges?"
          name="challenges"
          value={formData.challenges}
          onChange={(v) => updateField("challenges", v)}
          options={challengeOptions}
          columns={2}
          required
          errors={errors}
        />

        <WizardCheckboxGroup
          label="Integration Needs"
          name="integrationNeeds"
          value={formData.integrationNeeds}
          onChange={(v) => updateField("integrationNeeds", v)}
          options={integrationOptions}
          columns={2}
          errors={errors}
        />

        <WizardSelect
          label="Budget Range"
          name="budgetRange"
          value={formData.budgetRange}
          onChange={(v) => updateField("budgetRange", v)}
          options={budgetOptions}
          placeholder="Select your budget range"
          errors={errors}
        />

        <WizardRadioGroup
          label="Implementation Timeline"
          name="timeline"
          value={formData.timeline}
          onChange={(v) => updateField("timeline", v)}
          options={timelineOptions}
          columns={2}
          required
          errors={errors}
        />

        {formData.timeline === "specific-date" && (
          <div>
            <WizardInput
              label="Preferred Start Date"
              name="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={(v) => updateField("preferredDate", v)}
              errors={errors}
            />
          </div>
        )}
      </div>
    </div>
  );
}
