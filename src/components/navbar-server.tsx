import { getPublishedServices } from "@/lib/service-queries";
import { Navbar } from "./navbar";

export async function NavbarServer() {
  let services: { title: string; slug: string }[] = [];
  try {
    services = await getPublishedServices();
  } catch (error) {
    console.error("Failed to fetch services for navbar:", error);
  }
  return <Navbar services={services} />;
}
