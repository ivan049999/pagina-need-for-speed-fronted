import type { Metadata } from "next";
import { EaRegisterForm } from "@/components/auth/EaRegisterForm";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description: "Crea tu Cuenta EA — Need for Speed",
};

export default function RegistroPage() {
  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-[#0a1628] px-4 py-12">
      <EaRegisterForm />
    </div>
  );
}
