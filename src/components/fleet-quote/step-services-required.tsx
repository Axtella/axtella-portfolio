"use client";

import type { FleetQuoteFormData } from "@/lib/validations/fleet-quote";
import {
  WizardRadioGroup,
  WizardCheckboxGroup,
} from "./wizard-field-components";

interface StepProps {
  formData: FleetQuoteFormData;
  updateField: (field: string, value: unknown) => void;
  errors: Record<string, string[] | string | undefined>;
}

const planOptions = [
  {
    value: "basic",
    label: "Basic \u2014 Essential Tracking",
    description: "From SAR 30/vehicle/month",
  },
  {
    value: "standard",
    label: "Standard \u2014 Fleet Management",
    description: "From SAR 34/vehicle/month",
  },
  {
    value: "advanced",
    label: "Advanced \u2014 Enterprise Control",
    description: "From SAR 50/vehicle/month",
  },
  {
    value: "enterprise",
    label: "Enterprise / Government",
    description: "Custom pricing",
  },
  {
    value: "not-sure",
    label: "Not sure \u2014 help me choose",
  },
];

const coreFeatureOptions = [
  { value: "gps-tracking", label: "Real-Time GPS Tracking" },
  { value: "driver-behavior", label: "Driver Behavior Monitoring" },
  { value: "fuel-monitoring", label: "Fuel Monitoring & Theft Detection" },
  { value: "maintenance", label: "Maintenance & Diagnostics" },
  { value: "video-telematics", label: "Video Telematics (Dashcams)" },
  { value: "dashboards", label: "Custom Dashboards & Reports" },
  { value: "api-integration", label: "API / ERP Integration" },
  { value: "temperature", label: "Temperature Monitoring (Cold Chain)" },
  { value: "load-weight", label: "Load / Weight Monitoring" },
  { value: "school-bus", label: "School Bus Tracking + Parent App" },
  { value: "atm-tracking", label: "ATM / High-Security Asset Tracking" },
];

const hardwareOptions = [
  { value: "gps-trackers", label: "GPS Trackers" },
  { value: "front-dashcam", label: "Front-Facing Dashcam" },
  { value: "dual-dashcam", label: "Dual-Facing AI Dashcam" },
  { value: "temp-sensor", label: "Temperature Sensor" },
  { value: "load-sensor", label: "Load Sensor" },
  { value: "atm-kit", label: "ATM Tracking Kit" },
  { value: "school-bus-kit", label: "School Bus Kit" },
  { value: "recommend", label: "Not sure \u2014 recommend for me" },
];

const mobileAppOptions = [
  { value: "both", label: "Yes, iOS and Android" },
  { value: "ios", label: "Yes, iOS only" },
  { value: "android", label: "Yes, Android only" },
  { value: "web-only", label: "No, web dashboard is enough" },
];

export function StepServicesRequired({
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
          Services You Need
        </h2>
        <p
          className="text-gray-400 text-sm"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Select the plan, features, and hardware that match your fleet
          requirements.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <WizardRadioGroup
          label="Which plan are you interested in?"
          name="planInterest"
          value={formData.planInterest}
          onChange={(v) => updateField("planInterest", v)}
          options={planOptions}
          columns={2}
          required
          errors={errors}
        />

        <WizardCheckboxGroup
          label="Core Features"
          name="coreFeatures"
          value={formData.coreFeatures}
          onChange={(v) => updateField("coreFeatures", v)}
          options={coreFeatureOptions}
          columns={2}
          required
          errors={errors}
        />

        <WizardCheckboxGroup
          label="Hardware Needed"
          name="hardwareNeeded"
          value={formData.hardwareNeeded}
          onChange={(v) => updateField("hardwareNeeded", v)}
          options={hardwareOptions}
          columns={2}
          errors={errors}
        />

        <WizardRadioGroup
          label="Mobile App Preference"
          name="mobileApp"
          value={formData.mobileApp}
          onChange={(v) => updateField("mobileApp", v)}
          options={mobileAppOptions}
          columns={2}
          required
          errors={errors}
        />
      </div>
    </div>
  );
}
