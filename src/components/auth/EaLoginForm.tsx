"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { setAuthSession } from "@/lib/auth-session";
import { cn } from "@/lib/utils/cn";
import {
  EaAuthCard,
  EaAuthSeparator,
  EaGoogleSocialButton,
  EaLogo,
  eaFieldClass,
  eaLabelClass,
} from "@/components/auth/ea-auth-ui";

type LoginStep = "identifier" | "password";

const API_BASE_URL = "http://localhost:4000/api/v1";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function maskEmailForLogin(email: string) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  return `${user.slice(0, 2)}*****@${domain}`;
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

export function EaLoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>("identifier");
  const [email, setEmail] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canContinueIdentifier = isValidEmail(email);
  const canSignIn = password.length >= 1;

  function handleIdentifierSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canContinueIdentifier) return;
    setError(null);
    const trimmedEmail = email.trim();
    setMaskedEmail(maskEmailForLogin(trimmedEmail));
    setStep("password");
  }

  function handlePasswordSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSignIn) return;
    setError(null);
    setSigningIn(true);
    postJson<{
      ok: true;
      accessToken: string;
      refreshToken?: string;
      pilotName: string;
    }>(`${API_BASE_URL}/auth/login`, {
      email: email.trim(),
      password,
    })
      .then((data) => {
        setAuthSession(
          {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            pilotName: data.pilotName,
          },
          staySignedIn
        );
        router.push("/");
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Correo o contraseña incorrectos.";
        setError(message);
      })
      .finally(() => setSigningIn(false));
  }

  if (step === "password") {
    return (
      <EaAuthCard className="relative">
        <button
          type="button"
          onClick={() => {
            setStep("identifier");
            setPassword("");
            setError(null);
          }}
          className="absolute left-8 top-10 text-sm font-medium text-[#9aa4b2] transition-colors hover:text-white"
        >
          ‹ Atrás
        </button>

        <EaLogo />
        <h1 className="mb-4 text-center text-xl font-semibold leading-snug text-white">
          Introduce tu contraseña
        </h1>
        <p className="mb-6 text-center text-sm leading-relaxed text-[#9aa4b2]">
          Introduce tu contraseña para{" "}
          <span className="font-medium text-white">{maskedEmail}</span>
        </p>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="ea-login-password" className={eaLabelClass}>
              Contraseña
            </label>
            <div className="relative">
              <input
                id="ea-login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
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

          {error ? (
            <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={!canSignIn || signingIn}
            className={cn(
              "w-full rounded-md py-3 text-sm font-bold uppercase tracking-wide transition-colors",
              canSignIn && !signingIn
                ? "bg-[#0768f8] text-white hover:bg-[#1a75ff]"
                : "cursor-not-allowed bg-[#2a3344] text-[#6b7280]"
            )}
          >
            {signingIn ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-5 text-center">
          <Link href="#" className="text-sm text-[#5eb3f6] hover:underline">
            ¿Has olvidado la contraseña o necesitas crear una nueva?
          </Link>
        </p>
      </EaAuthCard>
    );
  }

  return (
    <EaAuthCard>
      <EaLogo />
      <h1 className="mb-8 text-center text-xl font-semibold leading-snug text-white">
        Inicia sesión en tu Cuenta EA
      </h1>

      <div className="mb-6 flex justify-center">
        <EaGoogleSocialButton />
      </div>

      <EaAuthSeparator />

      <form onSubmit={handleIdentifierSubmit} className="space-y-4">
        <div>
          <label htmlFor="ea-identifier" className={eaLabelClass}>
            Teléfono o correo electrónico
          </label>
          <input
            id="ea-identifier"
            type="email"
            autoComplete="email"
            placeholder="Escribe tu tlf. o correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={eaFieldClass}
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-[#c5cdd8]">
          <input
            type="checkbox"
            checked={staySignedIn}
            onChange={(e) => setStaySignedIn(e.target.checked)}
            className="h-4 w-4 rounded border-white/30 bg-[#0f141c] accent-[#0768f8]"
          />
          <span>No cerrar sesión</span>
          <span
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/30 text-[10px] text-white/70"
            title="Mantener la sesión iniciada en este dispositivo"
          >
            ?
          </span>
        </label>

        {error ? (
          <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
            {error.includes("No hay ninguna cuenta") ? (
              <>
                {" "}
                <Link href="/registro" className="text-[#5eb3f6] hover:underline">
                  Crear cuenta
                </Link>
              </>
            ) : null}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!canContinueIdentifier}
          className={cn(
            "w-full rounded-md py-3 text-sm font-bold uppercase tracking-wide transition-colors",
            canContinueIdentifier
              ? "bg-[#0768f8] text-white hover:bg-[#1a75ff]"
              : "cursor-not-allowed bg-[#2a3344] text-[#6b7280]"
          )}
        >
          Siguiente
        </button>
      </form>

      <p className="mt-5 text-center">
        <Link href="#" className="text-sm text-[#5eb3f6] hover:underline">
          ¿Has olvidado la contraseña o necesitas crear una nueva?
        </Link>
      </p>

      <Link
        href="/registro"
        className="mt-6 block w-full rounded-md border border-white/35 bg-transparent py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/5"
      >
        Crear cuenta
      </Link>
    </EaAuthCard>
  );
}
