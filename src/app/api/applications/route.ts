import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveFile } from "@/lib/upload";
import {
  jobApplicationSchema,
  ALLOWED_CV_TYPES,
  MAX_CV_SIZE,
} from "@/lib/validations/job-application";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const fields = {
      jobId: formData.get("jobId") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      coverLetter: (formData.get("coverLetter") as string) || "",
    };

    // Validate form fields
    const parsed = jobApplicationSchema.safeParse(fields);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    // Verify job exists and is active
    const job = await prisma.jobPosition.findUnique({
      where: { id: parsed.data.jobId },
    });
    if (!job) {
      return NextResponse.json({ error: "Job position not found" }, { status: 404 });
    }
    if (!job.active) {
      return NextResponse.json({ error: "This position is no longer accepting applications" }, { status: 400 });
    }

    // Validate CV file
    const cvFile = formData.get("cv") as File | null;
    if (!cvFile || cvFile.size === 0) {
      return NextResponse.json({ error: "CV file is required" }, { status: 400 });
    }
    if (!ALLOWED_CV_TYPES.includes(cvFile.type)) {
      return NextResponse.json({ error: "Only PDF, DOC, and DOCX files are accepted" }, { status: 400 });
    }
    if (cvFile.size > MAX_CV_SIZE) {
      return NextResponse.json({ error: "File size must be under 5MB" }, { status: 400 });
    }

    // Save CV file
    const saved = await saveFile(cvFile, "cvs");

    // Create application record
    const application = await prisma.jobApplication.create({
      data: {
        jobId: parsed.data.jobId,
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        coverLetter: parsed.data.coverLetter || null,
        cvFilename: cvFile.name,
        cvUrl: saved.url,
        cvSize: saved.size,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
