"use client";

import Link from "next/link";
import { useState } from "react";
import {
  EaAuthCard,
  EaAuthSeparator,
  EaGoogleSocialButton,
  EaLogo,
  eaFieldClass,
  eaLabelClass,
} from "@/components/auth/ea-auth-ui";

export function EaLoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(true);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ea-identifier" className={eaLabelClass}>
            Teléfono o correo electrónico
          </label>
          <input
            id="ea-identifier"
            type="text"
            autoComplete="username"
            placeholder="Escribe tu tlf. o correo electrónico"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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

        <button
          type="submit"
          className="w-full rounded-md bg-[#0768f8] py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1a75ff]"
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
