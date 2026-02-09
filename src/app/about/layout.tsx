import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Axtella",
  description: "Axtella Global - Technology & Infrastructure Solutions",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
