"use client";

import type { FleetQuoteFormData } from "@/lib/validations/fleet-quote";
import {
  WizardInput,
  WizardRadioGroup,
  WizardCheckboxGroup,
} from "./wizard-field-components";

interface StepProps {
  formData: FleetQuoteFormData;
  updateField: (field: string, value: unknown) => void;
  errors: Record<string, string[] | string | undefined>;
}

const fleetSizeOptions = [
  { value: "1-20", label: "1\u201320 vehicles" },
  { value: "21-50", label: "21\u201350 vehicles" },
  { value: "51-100", label: "51\u2013100 vehicles" },
  { value: "101-500", label: "101\u2013500 vehicles" },
  { value: "500-1000", label: "500\u20131,000 vehicles" },
  { value: "1000+", label: "1,000+ vehicles" },
];

const vehicleTypeOptions = [
  { value: "heavy-trucks", label: "Heavy Trucks" },
  { value: "light-trucks-vans", label: "Light Trucks / Vans" },
  { value: "sedans-suvs", label: "Sedans / SUVs" },
  { value: "buses", label: "Buses" },
  { value: "heavy-equipment", label: "Heavy Equipment (Excavators, Cranes)" },
  { value: "motorcycles", label: "Motorcycles" },
  { value: "agricultural", label: "Agricultural Vehicles" },
  { value: "specialized", label: "Specialized (Ambulance, Fire)" },
];

const fleetLocationOptions = [
  { value: "single-city", label: "Single city" },
  { value: "multiple-cities", label: "Multiple cities in Saudi" },
  { value: "saudi-gcc", label: "Saudi + GCC" },
  { value: "international", label: "International operations" },
];

const trackingSystemOptions = [
  { value: "yes-happy", label: "Yes, and we\u2019re satisfied" },
  { value: "yes-switching", label: "Yes, but looking to switch" },
  { value: "no", label: "No, first time" },
];

export function StepFleetDetails({ formData, updateField, errors }: StepProps) {
  const showCurrentProvider =
    formData.hasTrackingSystem === "yes-happy" ||
    formData.hasTrackingSystem === "yes-switching";

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Your Fleet
        </h2>
        <p
          className="text-gray-400 text-sm"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Help us understand the size and composition of your fleet.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <WizardRadioGroup
          label="Fleet Size"
          name="fleetSize"
          value={formData.fleetSize}
          onChange={(v) => updateField("fleetSize", v)}
          options={fleetSizeOptions}
          columns={3}
          required
          errors={errors}
        />

        <WizardCheckboxGroup
          label="Vehicle Types"
          name="vehicleTypes"
          value={formData.vehicleTypes}
          onChange={(v) => updateField("vehicleTypes", v)}
          options={vehicleTypeOptions}
          columns={2}
          required
          errors={errors}
        />

        <WizardRadioGroup
          label="Fleet Locations"
          name="fleetLocations"
          value={formData.fleetLocations}
          onChange={(v) => updateField("fleetLocations", v)}
          options={fleetLocationOptions}
          columns={2}
          required
          errors={errors}
        />

        <WizardRadioGroup
          label="Do you currently have a tracking system?"
          name="hasTrackingSystem"
          value={formData.hasTrackingSystem}
          onChange={(v) => updateField("hasTrackingSystem", v)}
          options={trackingSystemOptions}
          columns={3}
          required
          errors={errors}
        />

        {showCurrentProvider && (
          <div>
            <WizardInput
              label="Current Provider"
              name="currentProvider"
              value={formData.currentProvider}
              onChange={(v) => updateField("currentProvider", v)}
              placeholder="e.g. Wialon, Cartrack, etc."
              errors={errors}
            />
          </div>
        )}
      </div>
    </div>
  );
}
