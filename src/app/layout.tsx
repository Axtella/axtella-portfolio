import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { LenisProvider } from "@/providers/lenis-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Axtella | Technology & Infrastructure Solutions",
    template: "%s | Axtella",
  },
  description: "Axtella Global - Technology & Infrastructure Solutions. Fleet management, IT services, telecom, IoT, BMS, ELV systems, and more.",
  icons: {
    icon: "/logo1.png",
    apple: "/logo1.png",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://axtella.com"),
  openGraph: {
    type: "website",
    siteName: "Axtella",
    title: "Axtella | Technology & Infrastructure Solutions",
    description: "Axtella Global - Technology & Infrastructure Solutions",
    images: [{ url: "/logo1.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable} antialiased`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
