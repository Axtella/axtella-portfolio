import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });

  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: { id: "default" },
    });
  }

  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const settings = await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      siteName: body.siteName,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      address: body.address,
      socialLinks: body.socialLinks || {},
      footerText: body.footerText,
    },
    create: {
      id: "default",
      siteName: body.siteName,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      address: body.address,
      socialLinks: body.socialLinks || {},
      footerText: body.footerText,
    },
  });

  return NextResponse.json(settings);
}
