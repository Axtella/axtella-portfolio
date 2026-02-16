import { z } from "zod";

export const jobApplicationSchema = z.object({
  jobId: z.string().min(1, "Job position is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  coverLetter: z.string().optional().default(""),
});

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;

// CV file validation constants
export const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const MAX_CV_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];
