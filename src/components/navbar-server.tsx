import { getPublishedServices } from "@/lib/service-queries";
import { Navbar } from "./navbar";

export async function NavbarServer() {
  const services = await getPublishedServices();
  return <Navbar services={services} />;
}
