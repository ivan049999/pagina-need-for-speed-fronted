"use client";

import Link from "next/link";
import { useState } from "react";

function EaLogo() {
  return (
    <div
      className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white"
      aria-hidden
    >
      <span className="text-lg font-bold tracking-tight text-white">EA</span>
    </div>
  );
}

function SocialButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-[#252d3a] text-white transition-colors hover:border-white/30 hover:bg-[#2f3848]"
    >
      {children}
    </button>
  );
}

export function EaLoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(true);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div className="w-full max-w-[420px] rounded-lg bg-[#151c28] px-8 py-10 shadow-[0_16px_48px_rgba(0,0,0,0.45)]">
      <EaLogo />
      <h1 className="mb-8 text-center text-xl font-semibold leading-snug text-white">
        Inicia sesión en tu Cuenta EA
      </h1>

      <div className="mb-6 flex justify-center gap-2">
        <SocialButton label="Iniciar sesión con Google">
          <span className="text-base font-bold text-[#4285F4]">G</span>
        </SocialButton>
        <SocialButton label="Iniciar sesión con Facebook">
          <span className="text-lg font-bold text-[#1877F2]">f</span>
        </SocialButton>
        <SocialButton label="Iniciar sesión con Apple">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.79 15.25 6.3 7.59 12.03 7.5c1.12.07 1.9.74 2.83.74 1.02 0 1.75-.6 2.95-.6 1.24.02 2.15.58 2.73 1.45-2.4 1.33-2.01 4.78.48 5.72-.47 1.22-.72 2.45-1.35 3.47zM12.75 7.2c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
        </SocialButton>
        <SocialButton label="Iniciar sesión con Steam">
          <span className="text-xs font-bold">Steam</span>
        </SocialButton>
        <SocialButton label="Más opciones">
          <span className="text-lg leading-none text-white/80">···</span>
        </SocialButton>
      </div>

      <div className="relative mb-6 flex items-center">
        <div className="h-px flex-1 bg-white/15" />
        <div className="mx-3 h-2 w-2 rounded-full bg-white/25" />
        <div className="h-px flex-1 bg-white/15" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="ea-identifier"
            className="mb-2 block text-[11px] font-medium uppercase tracking-wide text-[#9aa4b2]"
          >
            Teléfono o correo electrónico
          </label>
          <input
            id="ea-identifier"
            type="text"
            autoComplete="username"
            placeholder="Escribe tu tlf. o correo electrónico"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full rounded-md border border-white/20 bg-[#0f141c] px-4 py-3 text-sm text-white placeholder:text-[#6b7280] outline-none transition focus:border-[#3d8bfd] focus:ring-1 focus:ring-[#3d8bfd]/40"
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

        <button
          type="submit"
          className="w-full rounded-md bg-[#0768f8] py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1a75ff]"
        >
          Siguiente
        </button>
      </form>

      <p className="mt-5 text-center">
        <Link
          href="#"
          className="text-sm text-[#5eb3f6] hover:underline"
        >
          ¿Has olvidado la contraseña o necesitas crear una nueva?
        </Link>
      </p>

      <Link
        href="https://www.ea.com/es-es/register"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block w-full rounded-md border border-white/35 bg-transparent py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/5"
      >
        Crear cuenta
      </Link>
    </div>
  );
}
