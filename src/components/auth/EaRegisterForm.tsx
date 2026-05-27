"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { buildBirthDateIso } from "@/lib/auth/birth-date";
import { ALL_COUNTRIES_ES, DEFAULT_COUNTRY_CODE } from "@/lib/countries-es";
import { cn } from "@/lib/utils/cn";
import {
  EaAuthCard,
  EaAuthSeparator,
  EaGoogleSocialButton,
  EaLogo,
  eaFieldClass,
  eaLabelClass,
} from "@/components/auth/ea-auth-ui";

type RegisterStep = "birth" | "email" | "code" | "credentials";

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

const MARKETING_TEXT =
  "Marcando la casilla, acepto que EA me envíe mensajes de correo electrónico sobre sus productos, noticias y eventos de acuerdo con la Política de privacidad y directiva de cookies de EA. Puedo retirar mi consentimiento en cualquier momento y puedo optar por no participar en el envío de mensajes de correo electrónico siguiendo el enlace para darse de baja que figura en los mensajes de correo electrónico que reciba.";

const TERMS_TEXT = (
  <>
    Acepto el{" "}
    <Link
      href="https://www.ea.com/es-es/legal/user-agreement"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#5eb3f6] hover:underline"
    >
      Acuerdo de usuario
    </Link>{" "}
    y comprendo que la{" "}
    <Link
      href="https://www.ea.com/es-es/legal/privacy-and-cookie-policy"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#5eb3f6] hover:underline"
    >
      Política de privacidad y directiva de cookies
    </Link>{" "}
    de EA se aplica a mi uso de los servicios de EA. Acepto que cualquier dato personal
    recopilado a través de mis usos de los servicios de EA se transfiere a EA en los
    Estados Unidos, tal y como se explica con más detalle en la Política de privacidad y
    directiva de cookies.
  </>
);

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidCode(value: string) {
  return /^\d{6}$/.test(value.trim());
}

function isValidEaId(value: string) {
  return /^[a-zA-Z0-9_]{4,16}$/.test(value.trim());
}

function isValidPassword(value: string) {
  return value.length >= 8 && value.length <= 64;
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    const message =
      typeof data.error === "string"
        ? data.error
        : "No se pudo completar la solicitud. Inténtalo de nuevo.";
    throw new Error(message);
  }
  return data;
}

const API_BASE_URL = "http://localhost:4000/api/v1";

export function EaRegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<RegisterStep>("birth");
  const [country, setCountry] = useState(DEFAULT_COUNTRY_CODE);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [code, setCode] = useState("");
  const [eaId, setEaId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const years = useMemo(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, index) => current - index);
  }, []);

  const canContinueBirth = Boolean(country && day && month && year);
  const canContinueEmail = isValidEmail(email);
  const canContinueCode = isValidCode(code);
  const canCreateAccount =
    isValidEaId(eaId) && isValidPassword(password) && termsAccepted;

  function handleBirthSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canContinueBirth) return;
    setStep("email");
  }

  function handleEmailSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canContinueEmail) return;
    setError(null);
    setSending(true);
    postJson<{ ok: true }>(`${API_BASE_URL}/auth/verification/start`, { email })
      .then(() => {
        setStep("code");
      })
      .catch(() => {
        setError("No se pudo enviar el código. Inténtalo de nuevo.");
      })
      .finally(() => setSending(false));
  }

  function handleCodeSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canContinueCode) return;
    setError(null);
    setVerifying(true);
    postJson<{ ok: true }>(`${API_BASE_URL}/auth/verification/verify`, {
      email,
      code,
    })
      .then(() => {
        setError(null);
        setStep("credentials");
      })
      .catch(() => {
        setError("Código incorrecto o caducado.");
      })
      .finally(() => setVerifying(false));
  }

  function handleCredentialsSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canCreateAccount) return;
    setError(null);
    setCreating(true);
    postJson<{ ok: true }>(`${API_BASE_URL}/auth/register`, {
      email,
      eaId: eaId.trim(),
      password,
      birthDate: buildBirthDateIso(day, month, year),
      countryCode: country,
    })
      .then(() => {
        router.push("/login");
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "No se pudo crear la cuenta. Inténtalo de nuevo.";
        setError(message);
      })
      .finally(() => setCreating(false));
  }

  if (step === "credentials") {
    return (
      <div className="flex w-full max-w-[420px] flex-col items-center">
        <EaAuthCard className="relative">
          <button
            type="button"
            onClick={() => setStep("code")}
            className="absolute left-8 top-10 text-sm font-medium text-[#9aa4b2] transition-colors hover:text-white"
          >
            ‹ Atrás
          </button>

          <EaLogo />
          <h1 className="mb-6 text-center text-xl font-semibold leading-snug text-white">
            Elige un ID de EA y una contraseña
          </h1>

          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <label htmlFor="ea-id" className={eaLabelClass}>
                ID de EA
              </label>
              <input
                id="ea-id"
                type="text"
                autoComplete="username"
                placeholder="Escribe tu ID de EA"
                value={eaId}
                onChange={(e) => setEaId(e.target.value.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 16))}
                className={eaFieldClass}
              />
              <p className="mt-2 text-xs leading-relaxed text-[#9aa4b2]">
                Así es como tus amistades pueden buscarte en la EA app o en los juegos de EA.
                La ID de EA debe tener de 4 a 16 caracteres.
              </p>
            </div>

            <div>
              <label htmlFor="ea-password" className={eaLabelClass}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="ea-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Introduce tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(eaFieldClass, "pr-12")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa4b2] transition-colors hover:text-white"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="h-5 w-5" aria-hidden />
                  ) : (
                    <HiOutlineEye className="h-5 w-5" aria-hidden />
                  )}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-left text-xs leading-relaxed text-[#9aa4b2]">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-[#0f141c] accent-[#0768f8]"
              />
              <span>{TERMS_TEXT}</span>
            </label>

            {error ? (
              <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={!canCreateAccount || creating}
              className={cn(
                "w-full rounded-md py-3 text-sm font-bold uppercase tracking-wide transition-colors",
                canCreateAccount && !creating
                  ? "bg-[#0768f8] text-white hover:bg-[#1a75ff]"
                  : "cursor-not-allowed bg-[#2a3344] text-[#6b7280]"
              )}
            >
              {creating ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>
        </EaAuthCard>
      </div>
    );
  }

  if (step === "email") {
    return (
      <div className="flex w-full max-w-[420px] flex-col items-center">
        <EaAuthCard className="relative">
          <button
            type="button"
            onClick={() => setStep("birth")}
            className="absolute left-8 top-10 text-sm font-medium text-[#9aa4b2] transition-colors hover:text-white"
          >
            ‹ Atrás
          </button>

          <EaLogo />
          <h1 className="mb-4 text-center text-xl font-semibold leading-snug text-white">
            Añade una dirección de correo electrónico
          </h1>
          <p className="mb-6 text-center text-sm leading-relaxed text-[#9aa4b2]">
            La dirección de correo electrónico se utiliza para acceder a tu Cuenta
            EA. Te recomendamos que utilices una dirección de correo electrónico
            personal y no una dirección de correo electrónico del trabajo o del
            colegio.
          </p>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label htmlFor="ea-email" className={eaLabelClass}>
                Correo electrónico
              </label>
              <input
                id="ea-email"
                type="email"
                autoComplete="email"
                placeholder="Introduce tu dirección de correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={eaFieldClass}
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-left text-xs leading-relaxed text-[#9aa4b2]">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-[#0f141c] accent-[#0768f8]"
              />
              <span>{MARKETING_TEXT}</span>
            </label>

            {error ? (
              <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={!canContinueEmail || sending}
              className={cn(
                "w-full rounded-md py-3 text-sm font-bold uppercase tracking-wide transition-colors",
                canContinueEmail && !sending
                  ? "bg-[#0768f8] text-white hover:bg-[#1a75ff]"
                  : "cursor-not-allowed bg-[#2a3344] text-[#6b7280]"
              )}
            >
              {sending ? "Enviando..." : "Siguiente"}
            </button>
          </form>
        </EaAuthCard>
      </div>
    );
  }

  if (step === "code") {
    return (
      <div className="flex w-full max-w-[420px] flex-col items-center">
        <EaAuthCard className="relative">
          <button
            type="button"
            onClick={() => setStep("email")}
            className="absolute left-8 top-10 text-sm font-medium text-[#9aa4b2] transition-colors hover:text-white"
          >
            ‹ Atrás
          </button>

          <EaLogo />
          <h1 className="mb-4 text-center text-xl font-semibold leading-snug text-white">
            Introduce el código de verificación
          </h1>
          <p className="mb-6 text-center text-sm leading-relaxed text-[#9aa4b2]">
            Hemos enviado un código de 6 dígitos a <span className="text-white">{email}</span>.
          </p>

          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div>
              <label htmlFor="ea-code" className={eaLabelClass}>
                Código de verificación
              </label>
              <input
                id="ea-code"
                inputMode="numeric"
                maxLength={6}
                autoComplete="one-time-code"
                placeholder="000000"
                value={code}
                onChange={(e) => {
                  const next = e.target.value.replace(/[^\d]/g, "").slice(0, 6);
                  setCode(next);
                }}
                className={eaFieldClass}
              />
            </div>

            {error ? (
              <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={!canContinueCode || verifying}
              className={cn(
                "w-full rounded-md py-3 text-sm font-bold uppercase tracking-wide transition-colors",
                canContinueCode && !verifying
                  ? "bg-[#0768f8] text-white hover:bg-[#1a75ff]"
                  : "cursor-not-allowed bg-[#2a3344] text-[#6b7280]"
              )}
            >
              {verifying ? "Verificando..." : "Siguiente"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              if (sending) return;
              setError(null);
              setSending(true);
              postJson<{ ok: true }>(`${API_BASE_URL}/auth/verification/start`, { email })
                .then(() => setCode(""))
                .catch(() => setError("No se pudo reenviar el código. Inténtalo de nuevo."))
                .finally(() => setSending(false));
            }}
            className={cn(
              "mt-4 w-full rounded-md border border-white/20 py-3 text-center text-sm font-bold uppercase tracking-wide transition-colors hover:bg-white/5",
              sending && "pointer-events-none opacity-60"
            )}
          >
            {sending ? "Reenviando..." : "Reenviar código"}
          </button>
        </EaAuthCard>
      </div>
    );
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

        <form onSubmit={handleBirthSubmit} className="space-y-4">
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
              {ALL_COUNTRIES_ES.map((c) => (
                <option key={c.value} value={c.value}>
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
                <option value="">Día</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={String(d)}>
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
                <option value="">Mes</option>
                {MONTHS.map((name, index) => (
                  <option key={name} value={String(index + 1)}>
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
                <option value="">Año</option>
                {years.map((y) => (
                  <option key={y} value={String(y)}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!canContinueBirth}
            className={cn(
              "w-full rounded-md py-3 text-sm font-bold uppercase tracking-wide transition-colors",
              canContinueBirth
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
