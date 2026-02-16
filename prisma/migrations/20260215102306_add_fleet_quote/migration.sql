-- CreateTable
CREATE TABLE "FleetQuote" (
    "id" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "companyName" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "jobTitle" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "fleetSize" TEXT NOT NULL,
    "vehicleTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "fleetLocations" TEXT,
    "hasTrackingSystem" TEXT NOT NULL,
    "currentProvider" TEXT,
    "planInterest" TEXT NOT NULL,
    "coreFeatures" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "hardwareNeeded" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "mobileApp" TEXT,
    "challenges" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "integrationNeeds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "budgetRange" TEXT,
    "timeline" TEXT,
    "preferredDate" TIMESTAMP(3),
    "contactMethod" TEXT,
    "bestTime" TEXT,
    "howHeard" TEXT,
    "additionalNotes" TEXT,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
    "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FleetQuote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FleetQuote_referenceNumber_key" ON "FleetQuote"("referenceNumber");
