"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils/cn";
import {
  EaAuthCard,
  EaAuthSeparator,
  EaGoogleSocialButton,
  EaLogo,
  eaFieldClass,
  eaLabelClass,
} from "@/components/auth/ea-auth-ui";

const COUNTRIES = [
  { value: "ES", label: "España" },
  { value: "MX", label: "México" },
  { value: "AR", label: "Argentina" },
  { value: "CO", label: "Colombia" },
  { value: "CL", label: "Chile" },
  { value: "US", label: "Estados Unidos" },
];

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function EaRegisterForm() {
  const [country, setCountry] = useState("ES");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const years = useMemo(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, index) => current - index);
  }, []);

  const canContinue = Boolean(country && day && month && year);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canContinue) return;
  }

  return (
    <div className="flex w-full max-w-[420px] flex-col items-center">
      <EaAuthCard>
        <EaLogo />
        <h1 className="mb-3 text-center text-xl font-semibold leading-snug text-white">
          Crea tu Cuenta EA
        </h1>
        <p className="mb-8 text-center text-sm leading-relaxed text-[#9aa4b2]">
          Usa una de tus cuentas existentes o empieza desde el principio.
        </p>

        <div className="mb-6 flex justify-center">
          <EaGoogleSocialButton />
        </div>

        <EaAuthSeparator />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ea-country" className={eaLabelClass}>
              País/región
            </label>
            <select
              id="ea-country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={cn(eaFieldClass, "cursor-pointer")}
            >
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value} className="bg-[#0f141c]">
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className={eaLabelClass}>Fecha de nacimiento</span>
            <div className="grid grid-cols-3 gap-2">
              <select
                id="ea-day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className={cn(eaFieldClass, "cursor-pointer px-2")}
                aria-label="Día"
              >
                <option value="" className="bg-[#0f141c]">
                  Día
                </option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={String(d)} className="bg-[#0f141c]">
                    {d}
                  </option>
                ))}
              </select>
              <select
                id="ea-month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={cn(eaFieldClass, "cursor-pointer px-2")}
                aria-label="Mes"
              >
                <option value="" className="bg-[#0f141c]">
                  Mes
                </option>
                {MONTHS.map((name, index) => (
                  <option key={name} value={String(index + 1)} className="bg-[#0f141c]">
                    {name}
                  </option>
                ))}
              </select>
              <select
                id="ea-year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={cn(eaFieldClass, "cursor-pointer px-2")}
                aria-label="Año"
              >
                <option value="" className="bg-[#0f141c]">
                  Año
                </option>
                {years.map((y) => (
                  <option key={y} value={String(y)} className="bg-[#0f141c]">
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!canContinue}
            className={cn(
              "w-full rounded-md py-3 text-sm font-bold uppercase tracking-wide transition-colors",
              canContinue
                ? "bg-[#0768f8] text-white hover:bg-[#1a75ff]"
                : "cursor-not-allowed bg-[#2a3344] text-[#6b7280]"
            )}
          >
            Siguiente
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#9aa4b2]">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-[#5eb3f6] hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </EaAuthCard>

      <Link
        href="https://www.ea.com/es-es/legal"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1 text-sm text-[#5eb3f6] hover:underline"
      >
        ¿Quieres crear una Cuenta EA para tu hijo?
        <span aria-hidden>↗</span>
      </Link>
    </div>
  );
}
