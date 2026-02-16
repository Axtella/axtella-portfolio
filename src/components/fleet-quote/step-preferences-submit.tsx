"use client";

import type { FleetQuoteFormData } from "@/lib/validations/fleet-quote";
import {
  WizardSelect,
  WizardRadioGroup,
  WizardTextarea,
  WizardCheckbox,
} from "./wizard-field-components";

interface StepProps {
  formData: FleetQuoteFormData;
  updateField: (field: string, value: unknown) => void;
  errors: Record<string, string[] | string | undefined>;
}

const contactMethodOptions = [
  { value: "phone", label: "Phone Call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
  { value: "video", label: "Video Call (Zoom / Teams)" },
];

const bestTimeOptions = [
  { value: "morning", label: "Morning (9 AM \u2013 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM \u2013 4 PM)" },
  { value: "evening", label: "Evening (4 PM \u2013 7 PM)" },
  { value: "anytime", label: "Anytime" },
];

const howHeardOptions = [
  { value: "google", label: "Google Search" },
  { value: "social-media", label: "Social Media" },
  { value: "referral", label: "Referral" },
  { value: "exhibition", label: "Exhibition / Event" },
  { value: "existing-client", label: "Existing Client" },
  { value: "other", label: "Other" },
];

export function StepPreferencesSubmit({
  formData,
  updateField,
  errors,
}: StepProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Almost Done!
        </h2>
        <p
          className="text-gray-400 text-sm"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Just a few more details so we can reach you with your customized
          proposal.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <WizardRadioGroup
          label="Preferred Contact Method"
          name="contactMethod"
          value={formData.contactMethod}
          onChange={(v) => updateField("contactMethod", v)}
          options={contactMethodOptions}
          columns={2}
          required
          errors={errors}
        />

        <WizardRadioGroup
          label="Best Time to Contact"
          name="bestTime"
          value={formData.bestTime}
          onChange={(v) => updateField("bestTime", v)}
          options={bestTimeOptions}
          columns={2}
          errors={errors}
        />

        <WizardSelect
          label="How Did You Hear About Us?"
          name="howHeard"
          value={formData.howHeard}
          onChange={(v) => updateField("howHeard", v)}
          options={howHeardOptions}
          placeholder="Select an option"
          errors={errors}
        />

        <WizardTextarea
          label="Additional Notes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={(v) => updateField("additionalNotes", v)}
          placeholder="Any specific requirements, questions, or details you'd like to share..."
          errors={errors}
        />

        {/* Terms & Consent */}
        <div className="space-y-4 pt-2">
          <WizardCheckbox
            label="I agree to Axtella's Terms of Service and Privacy Policy"
            name="termsAccepted"
            checked={formData.termsAccepted === true}
            onChange={(v) => updateField("termsAccepted", v)}
            required
            errors={errors}
          />

          <WizardCheckbox
            label="I'd like to receive updates about Axtella's fleet management solutions"
            name="marketingConsent"
            checked={formData.marketingConsent === true}
            onChange={(v) => updateField("marketingConsent", v)}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
