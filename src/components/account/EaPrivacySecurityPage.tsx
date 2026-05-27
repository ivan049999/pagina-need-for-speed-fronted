"use client";

import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { EaAccountShell } from "@/components/account/EaAccountShell";
import { IconChevronRight, IconInfo } from "@/components/account/ea-account-icons";
import { getAuthSession } from "@/lib/auth-session";
import { maskEmail } from "@/lib/auth/mask-email";
import { useEaAccountContext } from "@/lib/account/useEaAccountSession";
import { cn } from "@/lib/utils/cn";

const API_BASE_URL = "http://localhost:4000/api/v1";

const eaInputClass =
  "mt-1.5 w-full rounded-md border border-[#c5c9d0] bg-white px-3 py-2.5 text-sm text-[#1d2033] outline-none transition placeholder:text-[#9ca3af] focus:border-[#1d2033] focus:ring-1 focus:ring-[#1d2033]/20";

type PasswordFlowStep = "overview" | "verify" | "code" | "form";
type PanelView = "privacy" | "password" | "twoFactor" | "twoFactorSetup";
type TwoFactorSetupStep = "method" | "code";
type SecondaryEmailStep = "idle" | "form" | "code";

const panelCardClass =
  "rounded-sm bg-white px-6 py-6 text-[#1d2033] shadow-[0_4px_24px_rgba(0,0,0,0.25)] md:px-8 md:py-8";

function isValidEaPassword(value: string) {
  return (
    value.length >= 8 &&
    value.length <= 64 &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /\d/.test(value)
  );
}

function EaActionLink({
  children,
  className,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "text-sm font-normal text-[#2766ec] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2766ec]/40 disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}

function PrivacyRow({
  label,
  description,
  trailing,
  onClick,
  className,
}: {
  label: string;
  description?: string;
  trailing: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between gap-4 border-b border-[#e5e7eb] py-5 text-left last:border-b-0",
        onClick && "transition hover:bg-[#f9fafb]/80",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#1d2033]">{label}</p>
        {description ? (
          <p className="mt-1 text-sm leading-relaxed text-[#4b5563]">{description}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">{trailing}</div>
    </Tag>
  );
}

function AdToggleRow({
  title,
  description,
  active,
  onActivate,
}: {
  title: string;
  description: string;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <div className="border-b border-[#e5e7eb] py-5 last:border-b-0">
      <p className="text-sm font-semibold text-[#1d2033]">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-[#4b5563]">{description}</p>
      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="text-sm text-[#4b5563]">{active ? "Activado" : "Desactivado"}</span>
        {!active ? (
          <button
            type="button"
            onClick={onActivate}
            className="rounded-full border border-[#1d2033] bg-white px-5 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#1d2033] transition hover:bg-[#f3f4f6]"
          >
            Activar
          </button>
        ) : (
          <span className="text-xs font-medium uppercase tracking-wide text-[#1a9e32]">
            Activado
          </span>
        )}
      </div>
    </div>
  );
}

function ChangePasswordFlow({
  onCancel,
}: {
  onCancel: () => void;
}) {
  const { account } = useEaAccountContext();
  const [step, setStep] = useState<Exclude<PasswordFlowStep, "overview">>("verify");
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [draftCode, setDraftCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devHint, setDevHint] = useState<string | null>(null);

  const maskedEmail = account?.maskedEmail ?? "";

  async function handleSendCode() {
    const session = getAuthSession();
    if (!session) return;

    setSendingCode(true);
    setError(null);
    setDevHint(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile/password/send-code`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        delivery?: string;
        message?: string;
      };

      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "No se pudo enviar el código.");
        return;
      }

      if (data.delivery === "dev-console") {
        setDevHint(
          data.message ??
            "Revisa la consola del backend: ahí verás el código de 6 dígitos."
        );
      }

      setStep("code");
      setDraftCode("");
    } catch {
      setError("No se pudo enviar el código. Inténtalo de nuevo.");
    } finally {
      setSendingCode(false);
    }
  }

  async function handleVerifyCode() {
    const session = getAuthSession();
    if (!session) return;

    if (!/^\d{6}$/.test(draftCode)) {
      setError("Introduce el código de 6 dígitos.");
      return;
    }

    setVerifyingCode(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile/password/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ code: draftCode }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        code?: string;
      };

      if (!res.ok) {
        const reason = data.code ?? data.error;
        if (reason === "CODE_INVALID") {
          setError("Código incorrecto. Compruébalo e inténtalo de nuevo.");
        } else if (reason === "TOO_MANY_ATTEMPTS") {
          setError("Demasiados intentos. Solicita un código nuevo.");
        } else {
          setError(
            typeof data.error === "string"
              ? data.error
              : "Código no válido o caducado. Solicita uno nuevo."
          );
        }
        return;
      }

      setStep("form");
      setError(null);
    } catch {
      setError("No se pudo verificar el código. Inténtalo de nuevo.");
    } finally {
      setVerifyingCode(false);
    }
  }

  async function handleSavePassword() {
    const session = getAuthSession();
    if (!session) return;

    if (!isValidEaPassword(newPassword)) {
      setError(
        "Tu contraseña debe tener entre 8 y 64 caracteres e incluir al menos una letra minúscula, una mayúscula y un número."
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setSavingPassword(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ password: newPassword, confirmPassword }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "No se pudo guardar la contraseña.");
        return;
      }

      onCancel();
    } catch {
      setError("No se pudo guardar la contraseña. Inténtalo de nuevo.");
    } finally {
      setSavingPassword(false);
    }
  }

  if (step === "verify") {
    return (
      <div className={panelCardClass}>
        <h2 className="text-xl font-semibold">Seguridad</h2>
        <p className="mt-6 text-sm font-semibold">Cambiar contraseña</p>
        <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
          Para cambiar tu contraseña, primero tenemos que verificar tu identidad. Te enviaremos un
          código de verificación a la dirección de correo electrónico{" "}
          <span className="font-semibold text-[#1d2033]">{maskedEmail}</span>.
        </p>
        {error ? (
          <p className="mt-4 text-sm text-[#dc2626]" role="alert">
            {error}
          </p>
        ) : null}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={sendingCode}
            className="rounded-full border border-[#c5c9d0] bg-white px-6 py-2 text-sm font-medium text-[#1d2033] transition hover:bg-[#f9fafb] disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => void handleSendCode()}
            disabled={sendingCode}
            className="rounded-full bg-[#1d2033] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2d3148] disabled:opacity-50"
          >
            {sendingCode ? "Enviando…" : "Enviar código"}
          </button>
        </div>
      </div>
    );
  }

  if (step === "code") {
    return (
      <div className={panelCardClass}>
        <h2 className="text-xl font-semibold">Seguridad</h2>
        <p className="mt-6 text-sm font-semibold">Cambiar contraseña</p>
        {devHint ? (
          <p
            className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900"
            role="status"
          >
            {devHint}
          </p>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
            Introduce el código de 6 dígitos enviado a{" "}
            <span className="font-semibold text-[#1d2033]">{maskedEmail}</span>.
          </p>
        )}
        <input
          id="ea-password-code"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={draftCode}
          onChange={(event) =>
            setDraftCode(event.target.value.replace(/\D/g, "").slice(0, 6))
          }
          placeholder="000000"
          className={cn(eaInputClass, "mt-4 max-w-xs tracking-[0.3em]")}
          autoFocus
        />
        {error ? (
          <p className="mt-3 text-sm text-[#dc2626]" role="alert">
            {error}
          </p>
        ) : null}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={verifyingCode}
            className="rounded-full border border-[#c5c9d0] bg-white px-6 py-2 text-sm font-medium text-[#1d2033] transition hover:bg-[#f9fafb] disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => void handleVerifyCode()}
            disabled={verifyingCode || draftCode.length !== 6}
            className="rounded-full bg-[#1d2033] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2d3148] disabled:opacity-50"
          >
            {verifyingCode ? "Verificando…" : "Continuar"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={panelCardClass}>
      <h2 className="text-xl font-semibold">Seguridad</h2>
      <div className="mt-6 border-b border-[#e5e7eb] pb-6">
        <p className="text-sm font-semibold">Contraseña</p>
        <div className="mt-4">
          <label htmlFor="ea-new-password" className="text-sm font-semibold text-[#1d2033]">
            Nueva contraseña
          </label>
          <div className="relative">
            <input
              id="ea-new-password"
              type={showNewPassword ? "text" : "password"}
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className={cn(eaInputClass, "pr-11")}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[calc(50%+3px)] -translate-y-1/2 text-[#6b7280] hover:text-[#1d2033]"
              aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showNewPassword ? (
                <HiOutlineEyeOff className="h-5 w-5" aria-hidden />
              ) : (
                <HiOutlineEye className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="ea-confirm-password" className="text-sm font-semibold text-[#1d2033]">
            Confirmar nueva contraseña
          </label>
          <div className="relative">
            <input
              id="ea-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={cn(eaInputClass, "pr-11")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[calc(50%+3px)] -translate-y-1/2 text-[#6b7280] hover:text-[#1d2033]"
              aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showConfirmPassword ? (
                <HiOutlineEyeOff className="h-5 w-5" aria-hidden />
              ) : (
                <HiOutlineEye className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-[#6b7280]">
          <IconInfo />
          <span>
            Tu contraseña debe tener entre 8 y 64 caracteres e incluir al menos una letra
            minúscula, una mayúscula y un número.
          </span>
        </p>
        {error ? (
          <p className="mt-3 text-sm text-[#dc2626]" role="alert">
            {error}
          </p>
        ) : null}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={savingPassword}
            className="rounded-full border border-[#c5c9d0] bg-white px-6 py-2 text-sm font-medium text-[#1d2033] transition hover:bg-[#f9fafb] disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => void handleSavePassword()}
            disabled={savingPassword}
            className="rounded-full bg-[#1d2033] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2d3148] disabled:opacity-50"
          >
            {savingPassword ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

const TWO_FACTOR_INTRO =
  "La Autenticación en dos pasos (anteriormente Verificación de inicio de sesión) añade una capa adicional de seguridad a tu Cuenta EA. Te enviaremos un código de verificación cuando inicies sesión desde un dispositivo no reconocido.";

function TwoFactorBackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm text-[#2766ec] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2766ec]/40"
    >
      &lt; Atrás
    </button>
  );
}

function TwoFactorDetailView({
  onBack,
  onActivate,
}: {
  onBack: () => void;
  onActivate: () => void;
}) {
  return (
    <div className={panelCardClass}>
      <TwoFactorBackLink onClick={onBack} />
      <h2 className="mt-4 text-xl font-semibold">Autenticación en dos pasos</h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4b5563]">{TWO_FACTOR_INTRO}</p>
      <button
        type="button"
        onClick={onActivate}
        className="mt-8 rounded-full bg-[#1d2033] px-8 py-2.5 text-sm font-medium text-white transition hover:bg-[#2d3148]"
      >
        Activar
      </button>
    </div>
  );
}

function TwoFactorSetupView({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: () => void;
}) {
  const { account, setAccount } = useEaAccountContext();
  const [setupStep, setSetupStep] = useState<TwoFactorSetupStep>("method");
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [draftCode, setDraftCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [devHint, setDevHint] = useState<string | null>(null);

  const userEmail = account?.email ?? "";

  async function handleSendCode() {
    const session = getAuthSession();
    if (!session) return;

    setSendingCode(true);
    setError(null);
    setDevHint(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile/two-factor/send-code`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        delivery?: string;
        message?: string;
      };

      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "No se pudo enviar el código.");
        return;
      }

      if (data.delivery === "dev-console") {
        setDevHint(
          data.message ??
            "Revisa la consola del backend: ahí verás el código de 6 dígitos."
        );
      }

      setSetupStep("code");
      setDraftCode("");
    } catch {
      setError("No se pudo enviar el código. Inténtalo de nuevo.");
    } finally {
      setSendingCode(false);
    }
  }

  async function handleVerifyCode() {
    const session = getAuthSession();
    if (!session) return;

    if (!/^\d{6}$/.test(draftCode)) {
      setError("Introduce el código de 6 dígitos.");
      return;
    }

    setVerifyingCode(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile/two-factor/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ code: draftCode }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        code?: string;
        twoFactorEnabled?: boolean;
      };

      if (!res.ok) {
        const reason = data.code ?? data.error;
        if (reason === "CODE_INVALID") {
          setError("Código incorrecto. Compruébalo e inténtalo de nuevo.");
        } else if (reason === "TOO_MANY_ATTEMPTS") {
          setError("Demasiados intentos. Solicita un código nuevo.");
        } else {
          setError(
            typeof data.error === "string"
              ? data.error
              : "Código no válido o caducado. Solicita uno nuevo."
          );
        }
        return;
      }

      setAccount((prev) => (prev ? { ...prev, twoFactorEnabled: true } : prev));
      onComplete();
    } catch {
      setError("No se pudo verificar el código. Inténtalo de nuevo.");
    } finally {
      setVerifyingCode(false);
    }
  }

  return (
    <div className={panelCardClass}>
      <TwoFactorBackLink onClick={onBack} />
      <h2 className="mt-4 text-xl font-semibold">Autenticación en dos pasos</h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4b5563]">{TWO_FACTOR_INTRO}</p>

      <div className="mt-6">
          {setupStep === "method" ? (
            <>
              <p className="text-sm leading-relaxed text-[#1d2033]">
                Enviaremos un código de verificación a{" "}
                <span className="font-semibold">{userEmail}</span> cuando inicies sesión desde un
                dispositivo no reconocido.
              </p>
              <div className="mt-4 flex items-start gap-2 rounded-md bg-[#f3f4f6] px-4 py-3 text-xs leading-relaxed text-[#4b5563]">
                <IconInfo />
                <span>
                  Si juegas a FIFA 15 o FIFA 16 en consolas de la generación anterior, es posible
                  que no puedas usar la autenticación en dos pasos.
                </span>
              </div>
              {error ? (
                <p className="mt-4 text-sm text-[#dc2626]" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => void handleSendCode()}
                  disabled={sendingCode}
                  className="rounded-full bg-[#1d2033] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2d3148] disabled:opacity-50"
                >
                  {sendingCode ? "Enviando…" : "Enviar código"}
                </button>
              </div>
            </>
          ) : (
            <>
              {devHint ? (
                <p
                  className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900"
                  role="status"
                >
                  {devHint}
                </p>
              ) : (
                <p className="text-sm leading-relaxed text-[#4b5563]">
                  Introduce el código de 6 dígitos enviado a{" "}
                  <span className="font-semibold text-[#1d2033]">{userEmail}</span>.
                </p>
              )}
              <input
                id="ea-two-factor-code"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={draftCode}
                onChange={(event) =>
                  setDraftCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="000000"
                className={cn(eaInputClass, "mt-4 max-w-xs tracking-[0.3em]")}
                autoFocus
              />
              {error ? (
                <p className="mt-3 text-sm text-[#dc2626]" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSetupStep("method");
                    setDraftCode("");
                    setError(null);
                  }}
                  disabled={verifyingCode}
                  className="rounded-full border border-[#c5c9d0] bg-white px-6 py-2 text-sm font-medium text-[#1d2033] transition hover:bg-[#f9fafb] disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => void handleVerifyCode()}
                  disabled={verifyingCode || draftCode.length !== 6}
                  className="rounded-full bg-[#1d2033] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2d3148] disabled:opacity-50"
                >
                  {verifyingCode ? "Verificando…" : "Activar"}
                </button>
              </div>
            </>
          )}
      </div>
    </div>
  );
}

function SecondaryEmailSection() {
  const { account, setAccount } = useEaAccountContext();
  const [step, setStep] = useState<SecondaryEmailStep>("idle");
  const [draftEmail, setDraftEmail] = useState("");
  const [draftCode, setDraftCode] = useState("");
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devHint, setDevHint] = useState<string | null>(null);

  const hasVerified = account?.secondaryEmailVerified ?? false;
  const masked = account?.secondaryEmailMasked;

  function handleCancel() {
    setStep("idle");
    setDraftEmail("");
    setDraftCode("");
    setError(null);
    setDevHint(null);
  }

  async function handleSendCode() {
    const session = getAuthSession();
    if (!session) return;

    const email = draftEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Introduce un correo electrónico válido.");
      return;
    }

    if (account?.email && email.toLowerCase() === account.email.toLowerCase()) {
      setError("El correo secundario debe ser distinto del correo principal.");
      return;
    }

    setSendingCode(true);
    setError(null);
    setDevHint(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile/secondary-email/send-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        delivery?: string;
        message?: string;
      };

      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "No se pudo enviar el código.");
        return;
      }

      if (data.delivery === "dev-console") {
        setDevHint(
          data.message ??
            "Revisa la consola del backend: ahí verás el código de 6 dígitos."
        );
      }

      setStep("code");
      setDraftCode("");
    } catch {
      setError("No se pudo enviar el código. Inténtalo de nuevo.");
    } finally {
      setSendingCode(false);
    }
  }

  async function handleVerifyCode() {
    const session = getAuthSession();
    if (!session) return;

    if (!/^\d{6}$/.test(draftCode)) {
      setError("Introduce el código de 6 dígitos.");
      return;
    }

    setVerifyingCode(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile/secondary-email/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ code: draftCode }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        code?: string;
        secondaryEmailMasked?: string;
        secondaryEmailVerified?: boolean;
      };

      if (!res.ok) {
        const reason = data.code ?? data.error;
        if (reason === "CODE_INVALID") {
          setError("Código incorrecto. Compruébalo e inténtalo de nuevo.");
        } else if (reason === "TOO_MANY_ATTEMPTS") {
          setError("Demasiados intentos. Solicita un código nuevo.");
        } else {
          setError(
            typeof data.error === "string"
              ? data.error
              : "Código no válido o caducado. Solicita uno nuevo."
          );
        }
        return;
      }

      setAccount((prev) =>
        prev
          ? {
              ...prev,
              secondaryEmailVerified: true,
              secondaryEmailMasked:
                data.secondaryEmailMasked ?? maskEmail(draftEmail.trim()),
            }
          : prev
      );
      handleCancel();
    } catch {
      setError("No se pudo verificar el código. Inténtalo de nuevo.");
    } finally {
      setVerifyingCode(false);
    }
  }

  if (step === "form" || step === "code") {
    return (
      <div className="border-b border-[#e5e7eb] py-5 last:border-b-0">
        <p className="text-sm font-semibold text-[#1d2033]">Correo electrónico secundario</p>
        {step === "form" ? (
          <>
            <label htmlFor="ea-secondary-email" className="sr-only">
              Correo electrónico secundario
            </label>
            <input
              id="ea-secondary-email"
              type="email"
              autoComplete="email"
              value={draftEmail}
              onChange={(event) => setDraftEmail(event.target.value)}
              placeholder="Introduce tu correo electrónico"
              className={eaInputClass}
              autoFocus
            />
            <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-[#6b7280]">
              <IconInfo />
              <span>
                Enviaremos un correo electrónico de verificación a la dirección de correo
                electrónico proporcionada.
              </span>
            </p>
            {error ? (
              <p className="mt-3 text-sm text-[#dc2626]" role="alert">
                {error}
              </p>
            ) : null}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={sendingCode}
                className="rounded-full border border-[#c5c9d0] bg-white px-6 py-2 text-sm font-medium text-[#1d2033] transition hover:bg-[#f9fafb] disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => void handleSendCode()}
                disabled={sendingCode}
                className="rounded-full bg-[#1d2033] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2d3148] disabled:opacity-50"
              >
                {sendingCode ? "Enviando…" : "Enviar código"}
              </button>
            </div>
          </>
        ) : (
          <>
            {devHint ? (
              <p
                className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900"
                role="status"
              >
                {devHint}
              </p>
            ) : (
              <p className="mt-3 text-sm text-[#4b5563]">
                Introduce el código de 6 dígitos enviado a{" "}
                <span className="font-semibold text-[#1d2033]">{draftEmail}</span>.
              </p>
            )}
            <input
              id="ea-secondary-email-code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={draftCode}
              onChange={(event) =>
                setDraftCode(event.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="000000"
              className={cn(eaInputClass, "max-w-xs tracking-[0.3em]")}
              autoFocus
            />
            {error ? (
              <p className="mt-3 text-sm text-[#dc2626]" role="alert">
                {error}
              </p>
            ) : null}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setDraftCode("");
                  setError(null);
                }}
                disabled={verifyingCode}
                className="rounded-full border border-[#c5c9d0] bg-white px-6 py-2 text-sm font-medium text-[#1d2033] transition hover:bg-[#f9fafb] disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => void handleVerifyCode()}
                disabled={verifyingCode || draftCode.length !== 6}
                className="rounded-full bg-[#1d2033] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2d3148] disabled:opacity-50"
              >
                {verifyingCode ? "Verificando…" : "Verificar"}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e5e7eb] py-5 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#1d2033]">Correo secundario</p>
        {hasVerified && masked ? (
          <p className="mt-1 text-sm text-[#4b5563]">{masked}</p>
        ) : (
          <p className="mt-1 text-sm leading-relaxed text-[#4b5563]">
            Recupera tu cuenta si pierdes el acceso al correo principal.
          </p>
        )}
      </div>
      {!hasVerified ? (
        <EaActionLink
          onClick={() => {
            setStep("form");
            setError(null);
          }}
        >
          + Añadir
        </EaActionLink>
      ) : null}
    </div>
  );
}

function EaPrivacySecurityPanel() {
  const { account } = useEaAccountContext();
  const [panelView, setPanelView] = useState<PanelView>("privacy");
  const [gameAdsActive, setGameAdsActive] = useState(false);
  const [thirdPartyAdsActive, setThirdPartyAdsActive] = useState(false);

  const twoFactorEnabled = account?.twoFactorEnabled ?? false;

  if (panelView === "password") {
    return <ChangePasswordFlow onCancel={() => setPanelView("privacy")} />;
  }

  if (panelView === "twoFactorSetup") {
    return (
      <TwoFactorSetupView
        onBack={() => setPanelView("twoFactor")}
        onComplete={() => setPanelView("privacy")}
      />
    );
  }

  if (panelView === "twoFactor") {
    return (
      <TwoFactorDetailView
        onBack={() => setPanelView("privacy")}
        onActivate={() => setPanelView("twoFactorSetup")}
      />
    );
  }

  return (
    <div className={panelCardClass}>
      <h2 className="mb-2 text-xl font-semibold">Privacidad y seguridad</h2>

      <div className="border-b border-[#e5e7eb] py-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#1d2033]">Contraseña</p>
            <p className="mt-1 font-mono text-sm tracking-widest text-[#4b5563]">••••••••</p>
          </div>
          <EaActionLink onClick={() => setPanelView("password")}>Editar</EaActionLink>
        </div>
      </div>

      <AdToggleRow
        title="Publicidad dirigida en el juego"
        description="Permite que EA y sus socios utilicen tus datos para mostrarte anuncios personalizados dentro de los juegos de EA."
        active={gameAdsActive}
        onActivate={() => setGameAdsActive(true)}
      />

      <AdToggleRow
        title="Publicidad dirigida de terceros"
        description="Permite que socios externos utilicen datos limitados para mostrarte anuncios personalizados fuera de los juegos de EA."
        active={thirdPartyAdsActive}
        onActivate={() => setThirdPartyAdsActive(true)}
      />

      <PrivacyRow
        label="Autenticación en dos pasos"
        description="Añade una capa extra de seguridad a tu cuenta."
        trailing={
          <>
            <span className="text-sm text-[#4b5563]">{twoFactorEnabled ? "Sí" : "No"}</span>
            <IconChevronRight />
          </>
        }
        onClick={() => setPanelView("twoFactor")}
      />

      <div className="mt-8 border-t border-[#e5e7eb] pt-2">
        <SecondaryEmailSection />
      </div>
    </div>
  );
}

export function EaPrivacySecurityPage() {
  return (
    <EaAccountShell>
      <EaPrivacySecurityPanel />
    </EaAccountShell>
  );
}
