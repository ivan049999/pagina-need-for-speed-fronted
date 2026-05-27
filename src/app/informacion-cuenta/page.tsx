import type { Metadata } from "next";
import { EaAccountPage } from "@/components/account/EaAccountPage";

export const metadata: Metadata = {
  title: "Información de la cuenta",
  description: "Gestiona tu Cuenta EA — Need for Speed",
};

export default function InformacionCuentaPage() {
  return <EaAccountPage />;
}
