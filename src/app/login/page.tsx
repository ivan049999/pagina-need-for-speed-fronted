import type { Metadata } from "next";
import { EaLoginForm } from "@/components/auth/EaLoginForm";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Inicia sesión en tu Cuenta EA — Need for Speed",
};

export default function LoginPage() {
  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-[#0a1628] px-4 py-12">
      <EaLoginForm />
    </div>
  );
}
