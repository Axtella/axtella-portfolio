import { z } from "zod";

// Step 1: Company Info
export const step1Schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Please select your industry"),
  contactPerson: z.string().min(1, "Contact person is required"),
  jobTitle: z.string().optional().default(""),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  city: z.string().min(1, "Please select your city"),
});

// Step 2: Fleet Details
export const step2Schema = z.object({
  fleetSize: z.string().min(1, "Please select your fleet size"),
  vehicleTypes: z.array(z.string()).min(1, "Select at least one vehicle type"),
  fleetLocations: z.string().min(1, "Please select fleet locations"),
  hasTrackingSystem: z.string().min(1, "Please answer this question"),
  currentProvider: z.string().optional().default(""),
});

// Step 3: Services Required
export const step3Schema = z.object({
  planInterest: z.string().min(1, "Please select a plan"),
  coreFeatures: z.array(z.string()).min(1, "Select at least one feature"),
  hardwareNeeded: z.array(z.string()).optional().default([]),
  mobileApp: z.string().min(1, "Please select your preference"),
});

// Step 4: Requirements
export const step4Schema = z.object({
  challenges: z.array(z.string()).min(1, "Select at least one challenge"),
  integrationNeeds: z.array(z.string()).optional().default([]),
  budgetRange: z.string().optional().default(""),
  timeline: z.string().min(1, "Please select your timeline"),
  preferredDate: z.string().optional().default(""),
});

// Step 5: Preferences & Submit
export const step5Schema = z.object({
  contactMethod: z.string().min(1, "Please select a contact method"),
  bestTime: z.string().optional().default(""),
  howHeard: z.string().optional().default(""),
  additionalNotes: z.string().optional().default(""),
  termsAccepted: z.literal(true, {
    error: "You must accept the terms and conditions",
  }),
  marketingConsent: z.boolean().optional().default(false),
});

// Full schema for server-side validation
export const fleetQuoteSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema);

// TypeScript type derived from the schema
export type FleetQuoteFormData = z.infer<typeof fleetQuoteSchema>;

// Step schemas array for easy lookup by step number
export const stepSchemas = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
];

// Manual lead entry schema (admin CRM)
export const manualLeadSchema = z.object({
  source: z.literal("manual"),
  companyName: z.string().min(1, "Company name is required"),
  contactPerson: z.string().min(1, "Customer name is required"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  city: z.string().min(1, "Location is required"),
  status: z.string().optional().default("prospect"),
  callDate: z.string().optional().default(""),
  nextFollowUpDate: z.string().optional().default(""),
  adminNotes: z.string().optional().default(""),
});

export type ManualLeadData = z.infer<typeof manualLeadSchema>;

// Default initial form state
export const defaultFormData: FleetQuoteFormData = {
  // Step 1
  companyName: "",
  industry: "",
  contactPerson: "",
  jobTitle: "",
  email: "",
  phone: "",
  city: "",
  // Step 2
  fleetSize: "",
  vehicleTypes: [],
  fleetLocations: "",
  hasTrackingSystem: "",
  currentProvider: "",
  // Step 3
  planInterest: "",
  coreFeatures: [],
  hardwareNeeded: [],
  mobileApp: "",
  // Step 4
  challenges: [],
  integrationNeeds: [],
  budgetRange: "",
  timeline: "",
  preferredDate: "",
  // Step 5
  contactMethod: "",
  bestTime: "",
  howHeard: "",
  additionalNotes: "",
  termsAccepted: true as const,
  marketingConsent: false,
};
