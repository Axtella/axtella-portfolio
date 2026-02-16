import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fleetQuoteSchema, manualLeadSchema } from "@/lib/validations/fleet-quote";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isManual = body.source === "manual";

    // Generate reference number inside a transaction to avoid race conditions
    const year = new Date().getFullYear();
    const prefix = `AXT-FLT-${year}`;

    if (isManual) {
      // Manual lead entry from admin — minimal validation
      const result = manualLeadSchema.safeParse(body);
      if (!result.success) {
        return NextResponse.json(
          { error: "Validation failed", issues: result.error.flatten().fieldErrors },
          { status: 400 }
        );
      }

      const data = result.data;

      const quote = await prisma.$transaction(async (tx) => {
        const count = await tx.fleetQuote.count({
          where: { referenceNumber: { startsWith: prefix } },
        });
        const referenceNumber = `${prefix}-${String(count + 1).padStart(4, "0")}`;

        return tx.fleetQuote.create({
          data: {
            referenceNumber,
            source: "manual",
            status: data.status || "prospect",
            companyName: data.companyName,
            contactPerson: data.contactPerson,
            phone: data.phone,
            email: data.email || null,
            city: data.city,
            callDate: data.callDate ? new Date(data.callDate) : null,
            nextFollowUpDate: data.nextFollowUpDate ? new Date(data.nextFollowUpDate) : null,
            adminNotes: data.adminNotes || null,
          },
        });
      });

      return NextResponse.json(
        { id: quote.id, referenceNumber: quote.referenceNumber },
        { status: 201 }
      );
    }

    // Form submission — full wizard validation
    const result = fleetQuoteSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    const quote = await prisma.$transaction(async (tx) => {
      const count = await tx.fleetQuote.count({
        where: { referenceNumber: { startsWith: prefix } },
      });
      const referenceNumber = `${prefix}-${String(count + 1).padStart(4, "0")}`;

      return tx.fleetQuote.create({
        data: {
          referenceNumber,
          source: "form",
          status: "prospect",
          companyName: data.companyName,
          industry: data.industry,
          contactPerson: data.contactPerson,
          jobTitle: data.jobTitle || null,
          email: data.email,
          phone: data.phone,
          city: data.city,
          fleetSize: data.fleetSize,
          vehicleTypes: data.vehicleTypes,
          fleetLocations: data.fleetLocations || null,
          hasTrackingSystem: data.hasTrackingSystem,
          currentProvider: data.currentProvider || null,
          planInterest: data.planInterest,
          coreFeatures: data.coreFeatures,
          hardwareNeeded: data.hardwareNeeded || [],
          mobileApp: data.mobileApp || null,
          challenges: data.challenges,
          integrationNeeds: data.integrationNeeds || [],
          budgetRange: data.budgetRange || null,
          timeline: data.timeline || null,
          preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
          contactMethod: data.contactMethod || null,
          bestTime: data.bestTime || null,
          howHeard: data.howHeard || null,
          additionalNotes: data.additionalNotes || null,
          termsAccepted: Boolean(data.termsAccepted),
          marketingConsent: data.marketingConsent || false,
        },
      });
    });

    return NextResponse.json(
      { id: quote.id, referenceNumber: quote.referenceNumber },
      { status: 201 }
    );
  } catch (error) {
    console.error("Fleet quote submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit quote request" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const quotes = await prisma.fleetQuote.findMany({
      where: status && status !== "all" ? { status } : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        referenceNumber: true,
        companyName: true,
        contactPerson: true,
        email: true,
        phone: true,
        city: true,
        fleetSize: true,
        planInterest: true,
        status: true,
        source: true,
        callDate: true,
        nextFollowUpDate: true,
        adminNotes: true,
        createdAt: true,
      },
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Fleet quotes list error:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}
