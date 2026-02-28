import { getPublishedServices } from "@/lib/service-queries";
import { Navbar } from "./navbar";

export async function NavbarServer() {
  let services: { title: string; slug: string; isNew: boolean }[] = [];
  let debugError = "";
  try {
    services = await getPublishedServices();
  } catch (error) {
    debugError = error instanceof Error ? error.message : String(error);
    console.error("Failed to fetch services for navbar:", error);
  }
  return <Navbar services={services} debugError={debugError} />;
}
