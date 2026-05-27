"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  EaAccountAvatar,
  EaCircleLogo,
  EaRainbowAvatarRing,
  IconCheckVerified,
  IconFamily,
  IconInfo,
  IconLink,
  IconLogout,
  IconMail,
  IconShield,
  IconStar,
  IconUser,
  IconWallet,
} from "@/components/account/ea-account-icons";
import { LogoutOverlay } from "@/components/auth/LogoutOverlay";
import {
  AUTH_SESSION_CHANGE_EVENT,
  clearAuthSession,
  getAuthSession,
} from "@/lib/auth-session";
import {
  buildBirthDateIso,
  formatBirthDateDisplay,
  parseBirthDateIso,
} from "@/lib/auth/birth-date";
import { maskEmail } from "@/lib/auth/mask-email";
import { ALL_COUNTRIES_ES } from "@/lib/countries-es";
import {
  DEFAULT_PHONE_DIAL_CODE,
  PHONE_COUNTRY_OPTIONS,
} from "@/lib/phone/calling-codes";
import { cn } from "@/lib/utils/cn";

type PhoneStep = "idle" | "form" | "code";

const API_BASE_URL = "http://localhost:4000/api/v1";

type AccountData = {
  pilotName: string;
  email: string;
  maskedEmail: string;
  memberSinceYear: number;
  emailVerified: boolean;
  firstName: string | null;
  lastName: string | null;
  birthDate: string | null;
  countryCode: string | null;
  phoneMasked: string | null;
  phoneVerified: boolean;
};

function getCountryLabel(countryCode: string | null) {
  if (!countryCode) return "España";
  return ALL_COUNTRIES_ES.find((c) => c.value === countryCode)?.label ?? countryCode;
}

const eaNameInputClass =
  "mt-1.5 w-full rounded-md border border-[#c5c9d0] bg-white px-3 py-2.5 text-sm text-[#1d2033] outline-none transition placeholder:text-[#9ca3af] focus:border-[#1d2033] focus:ring-1 focus:ring-[#1d2033]/20";

const eaBirthSelectClass =
  "w-full rounded-md border border-[#c5c9d0] bg-white px-3 py-2.5 text-sm text-[#1d2033] outline-none transition focus:border-[#1d2033] focus:ring-1 focus:ring-[#1d2033]/20";

function formatDisplayName(firstName: string | null, lastName: string | null) {
  const parts = [firstName, lastName].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : null;
}

const SIDEBAR_ITEMS = [
  { id: "info", label: "Información de la cuenta", href: "/informacion-cuenta", icon: IconUser, active: true },
  { id: "connected", label: "Cuentas conectadas", href: "#", icon: IconLink },
  { id: "privacy", label: "Privacidad y seguridad", href: "#", icon: IconShield },
  { id: "comms", label: "Preferencias de comunicación", href: "#", icon: IconMail },
  { id: "wallet", label: "Pago y Monedero", href: "#", icon: IconWallet },
  { id: "family", label: "Gestión de la familia", href: "#", icon: IconFamily },
  { id: "subs", label: "Membresías y suscripciones", href: "#", icon: IconStar },
] as const;

const MENU_LINKS = [
  { label: "Información de la cuenta", href: "/informacion-cuenta" },
  { label: "Cuentas conectadas", href: "#" },
  { label: "Privacidad y seguridad", href: "#" },
  { label: "Preferencias de comunicación", href: "#" },
  { label: "Pago y Monedero", href: "#" },
  { label: "Gestión de la familia", href: "#" },
  { label: "Membresías y suscripciones", href: "#" },
];

function EaActionLink({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-sm font-normal text-[#2766ec] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2766ec]/40",
        className
      )}
    >
      {children}
    </button>
  );
}

function AccountFieldRow({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="border-b border-[#e5e7eb] py-5 last:border-b-0">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#1d2033]">{label}</p>
          <div className="mt-1 text-sm text-[#4b5563]">{children}</div>
          {hint ? (
            <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-[#6b7280]">
              <IconInfo />
              <span>{hint}</span>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function EaAccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<AccountData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDob, setShowDob] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [draftFirstName, setDraftFirstName] = useState("");
  const [draftLastName, setDraftLastName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [editingBirthDate, setEditingBirthDate] = useState(false);
  const [draftBirthYear, setDraftBirthYear] = useState("");
  const [draftBirthMonth, setDraftBirthMonth] = useState("");
  const [draftBirthDay, setDraftBirthDay] = useState("");
  const [savingBirthDate, setSavingBirthDate] = useState(false);
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [phoneStep, setPhoneStep] = useState<PhoneStep>("idle");
  const [draftDialCode, setDraftDialCode] = useState(DEFAULT_PHONE_DIAL_CODE);
  const [draftPhoneNumber, setDraftPhoneNumber] = useState("");
  const [draftPhoneCode, setDraftPhoneCode] = useState("");
  const [sendingPhoneCode, setSendingPhoneCode] = useState(false);
  const [verifyingPhoneCode, setVerifyingPhoneCode] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [phoneDevHint, setPhoneDevHint] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const birthYears = useMemo(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, index) => current - index);
  }, []);

  const loadAccount = useCallback(async () => {
    const session = getAuthSession();
    if (!session) {
      router.replace("/login");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      const data = (await res.json().catch(() => ({}))) as {
        pilotName?: string;
        email?: string;
        memberSinceYear?: number;
        emailVerified?: boolean;
        firstName?: string | null;
        lastName?: string | null;
        birthDate?: string | null;
        countryCode?: string | null;
        phoneMasked?: string | null;
        phoneVerified?: boolean;
      };

      if (!res.ok) {
        clearAuthSession();
        router.replace("/login");
        return;
      }

      const email = data.email ?? "";
      setAccount({
        pilotName: data.pilotName ?? session.pilotName ?? "Piloto",
        email,
        maskedEmail: maskEmail(email),
        memberSinceYear: data.memberSinceYear ?? new Date().getFullYear(),
        emailVerified: data.emailVerified ?? true,
        firstName: data.firstName ?? null,
        lastName: data.lastName ?? null,
        birthDate: data.birthDate ?? null,
        countryCode: data.countryCode ?? null,
        phoneMasked: data.phoneMasked ?? null,
        phoneVerified: data.phoneVerified ?? false,
      });
    } catch {
      const email = "";
      setAccount({
        pilotName: session.pilotName || "Piloto",
        email,
        maskedEmail: "",
        memberSinceYear: new Date().getFullYear(),
        emailVerified: true,
        firstName: null,
        lastName: null,
        birthDate: null,
        countryCode: null,
        phoneMasked: null,
        phoneVerified: false,
      });
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadAccount();
  }, [loadAccount]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    function onAuthChange() {
      if (!getAuthSession()) router.replace("/login");
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener(AUTH_SESSION_CHANGE_EVENT, onAuthChange);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, onAuthChange);
    };
  }, [router]);

  function handleStartAddPhone() {
    setEditingName(false);
    setEditingBirthDate(false);
    setDraftDialCode(DEFAULT_PHONE_DIAL_CODE);
    setDraftPhoneNumber("");
    setDraftPhoneCode("");
    setPhoneError(null);
    setPhoneDevHint(null);
    setPhoneStep("form");
  }

  function handleCancelPhone() {
    setPhoneStep("idle");
    setPhoneError(null);
    setPhoneDevHint(null);
    setDraftPhoneCode("");
  }

  async function handleSendPhoneCode() {
    const session = getAuthSession();
    if (!session) return;

    const digits = draftPhoneNumber.replace(/\D/g, "");
    if (digits.length < 6) {
      setPhoneError("Introduce un número de teléfono válido.");
      return;
    }

    setSendingPhoneCode(true);
    setPhoneError(null);
    setPhoneDevHint(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile/phone/send-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ dialCode: draftDialCode, phoneNumber: digits }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        delivery?: string;
        message?: string;
      };

      if (!res.ok) {
        setPhoneError(
          typeof data.error === "string" ? data.error : "No se pudo enviar el código."
        );
        return;
      }

      if (data.delivery === "dev-console") {
        setPhoneDevHint(
          data.message ??
            "No se pudo enviar el SMS (cuenta Trial o país restringido). Abre la terminal del backend en tu PC: ahí verás el código de 6 dígitos."
        );
      }

      setPhoneStep("code");
      setDraftPhoneCode("");
    } catch {
      setPhoneError("No se pudo enviar el código. Inténtalo de nuevo.");
    } finally {
      setSendingPhoneCode(false);
    }
  }

  async function handleVerifyPhoneCode() {
    const session = getAuthSession();
    if (!session || !account) return;

    if (!/^\d{6}$/.test(draftPhoneCode.trim())) {
      setPhoneError("El código debe tener 6 dígitos.");
      return;
    }

    setVerifyingPhoneCode(true);
    setPhoneError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile/phone/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ code: draftPhoneCode.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        phoneMasked?: string;
        phoneVerified?: boolean;
        error?: string;
      };

      if (!res.ok) {
        if (data.code === "CODE_INVALID") {
          setPhoneError("Código incorrecto.");
        } else if (data.code === "CODE_INVALID_OR_EXPIRED") {
          setPhoneError("Código caducado. Envía uno nuevo.");
        } else {
          setPhoneError(
            typeof data.error === "string" ? data.error : "No se pudo verificar el código."
          );
        }
        return;
      }

      setAccount((prev) =>
        prev
          ? {
              ...prev,
              phoneMasked: data.phoneMasked ?? prev.phoneMasked,
              phoneVerified: data.phoneVerified ?? true,
            }
          : prev
      );
      setPhoneStep("idle");
    } catch {
      setPhoneError("No se pudo verificar el código. Inténtalo de nuevo.");
    } finally {
      setVerifyingPhoneCode(false);
    }
  }

  function handleStartEditName() {
    if (!account) return;
    setPhoneStep("idle");
    setEditingBirthDate(false);
    setDraftFirstName(account.firstName ?? "");
    setDraftLastName(account.lastName ?? "");
    setNameError(null);
    setEditingName(true);
  }

  function handleCancelEditName() {
    setEditingName(false);
    setNameError(null);
  }

  async function handleSaveName() {
    const session = getAuthSession();
    if (!session || !account) return;

    const firstName = draftFirstName.trim();
    const lastName = draftLastName.trim();
    if (!firstName || !lastName) {
      setNameError("Completa nombre y apellido.");
      return;
    }

    setSavingName(true);
    setNameError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile/name`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ firstName, lastName }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        firstName?: string;
        lastName?: string;
        error?: string;
      };

      if (!res.ok) {
        setNameError(
          typeof data.error === "string" ? data.error : "No se pudo guardar el nombre."
        );
        return;
      }

      setAccount((prev) =>
        prev
          ? {
              ...prev,
              firstName: data.firstName ?? firstName,
              lastName: data.lastName ?? lastName,
            }
          : prev
      );
      setEditingName(false);
    } catch {
      setNameError("No se pudo guardar el nombre. Inténtalo de nuevo.");
    } finally {
      setSavingName(false);
    }
  }

  function handleStartEditBirthDate() {
    if (!account) return;
    setPhoneStep("idle");
    setEditingName(false);
    const parsed = parseBirthDateIso(account.birthDate);
    setDraftBirthYear(parsed.year);
    setDraftBirthMonth(parsed.month);
    setDraftBirthDay(parsed.day);
    setBirthDateError(null);
    setEditingBirthDate(true);
  }

  function handleCancelEditBirthDate() {
    setEditingBirthDate(false);
    setBirthDateError(null);
  }

  async function handleSaveBirthDate() {
    const session = getAuthSession();
    if (!session || !account) return;

    if (!draftBirthYear || !draftBirthMonth || !draftBirthDay) {
      setBirthDateError("Selecciona año, mes y día.");
      return;
    }

    const birthDate = buildBirthDateIso(draftBirthDay, draftBirthMonth, draftBirthYear);
    setSavingBirthDate(true);
    setBirthDateError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile/birth-date`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ birthDate }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        birthDate?: string;
        error?: string;
      };

      if (!res.ok) {
        setBirthDateError(
          typeof data.error === "string"
            ? data.error
            : "No se pudo guardar la fecha de nacimiento."
        );
        return;
      }

      setAccount((prev) =>
        prev
          ? { ...prev, birthDate: data.birthDate ?? birthDate }
          : prev
      );
      setEditingBirthDate(false);
      setShowDob(true);
    } catch {
      setBirthDateError("No se pudo guardar la fecha de nacimiento. Inténtalo de nuevo.");
    } finally {
      setSavingBirthDate(false);
    }
  }

  function handleLogout() {
    if (isLoggingOut || !account) return;
    setMenuOpen(false);
    setIsLoggingOut(true);
  }

  const handleLogoutComplete = useCallback(() => {
    clearAuthSession();
    setIsLoggingOut(false);
    router.push("/");
    router.refresh();
  }, [router]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a1628]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      </div>
    );
  }

  if (!account) return null;

  return (
    <>
      {isLoggingOut ? (
        <LogoutOverlay pilotName={account.pilotName} onComplete={handleLogoutComplete} />
      ) : null}

      <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#0a1628] text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(60,100,180,0.35),transparent_55%)]"
          aria-hidden
        />

        <header className="relative border-b border-white/10 bg-[#0a1628]/90 backdrop-blur-sm">
          <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 md:px-8">
            <Link href="/" className="flex items-center gap-2.5">
              <EaCircleLogo className="h-8 w-8" />
              <span className="text-lg font-normal text-white">Cuenta</span>
            </Link>

            <div className="flex items-center gap-6">
              <a
                href="https://help.ea.com/es/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden text-sm text-white/90 hover:text-white sm:inline"
              >
                Ayuda de EA
              </a>

              <div ref={menuRef} className="relative">
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                  onClick={() => setMenuOpen((value) => !value)}
                  className="flex items-center gap-2 rounded-full outline-none ring-white/40 focus-visible:ring-2"
                >
                  <EaRainbowAvatarRing>
                    <EaAccountAvatar size="sm" />
                  </EaRainbowAvatarRing>
                </button>

                {menuOpen ? (
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-10 mt-2 w-[280px] overflow-hidden rounded-md border border-white/10 bg-white text-[#1d2033] shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                  >
                    <div className="flex items-center gap-3 border-b border-[#e5e7eb] px-4 py-3">
                      <EaAccountAvatar size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{account.pilotName}</p>
                        <p className="text-xs text-[#6b7280]">
                          Miembro desde {account.memberSinceYear}
                        </p>
                      </div>
                    </div>
                    <nav className="py-1">
                      {MENU_LINKS.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          role="menuitem"
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2.5 text-sm text-[#1d2033] hover:bg-[#f3f4f6]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                    <div className="border-t border-[#e5e7eb] py-1">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-[#1d2033] hover:bg-[#f3f4f6]"
                      >
                        <IconLogout />
                        Cierra sesión con tu Cuenta EA
                      </button>
                    </div>
                    <div className="flex gap-4 border-t border-[#e5e7eb] px-4 py-2.5 text-xs text-[#2766ec]">
                      <a href="#" className="hover:underline">
                        Mis incidencias
                      </a>
                      <a
                        href="https://help.ea.com/es/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Ayuda de EA
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </header>

        <section className="relative mx-auto max-w-[1200px] px-4 pb-6 pt-8 md:px-8">
          <div className="flex items-center gap-5">
            <EaRainbowAvatarRing>
              <EaAccountAvatar size="lg" />
            </EaRainbowAvatarRing>
            <div>
              <h1 className="text-3xl font-normal tracking-tight md:text-4xl">
                {account.pilotName}
              </h1>
              <p className="mt-1 text-sm text-white/70">
                Miembro desde {account.memberSinceYear}
              </p>
            </div>
          </div>
        </section>

        <div className="relative mx-auto flex max-w-[1200px] flex-col gap-0 px-4 pb-16 md:flex-row md:px-8">
          <aside className="mb-6 w-full shrink-0 md:mb-0 md:w-[260px]">
            <nav className="overflow-hidden rounded-sm bg-white/[0.06] backdrop-blur-sm">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-3 border-b border-white/5 px-4 py-3.5 text-sm transition-colors last:border-b-0",
                      "active" in item && item.active
                        ? "bg-white/10 font-medium text-white"
                        : "text-white/75 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {"active" in item && item.active ? (
                      <span
                        className="absolute left-0 top-0 h-full w-[3px] bg-[#2766ec]"
                        aria-hidden
                      />
                    ) : null}
                    <Icon />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main className="min-w-0 flex-1 md:pl-6">
            <div className="rounded-sm bg-white px-6 py-6 text-[#1d2033] shadow-[0_4px_24px_rgba(0,0,0,0.25)] md:px-8 md:py-8">
              <h2 className="mb-2 text-xl font-semibold">Información de la cuenta</h2>

              <AccountFieldRow label="EA ID">
                <p>{account.pilotName}</p>
              </AccountFieldRow>

              <div className="border-b border-[#e5e7eb] py-5">
                {editingName ? (
                  <div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="ea-first-name" className="text-sm font-semibold text-[#1d2033]">
                          Nombre
                        </label>
                        <input
                          id="ea-first-name"
                          type="text"
                          value={draftFirstName}
                          onChange={(event) => setDraftFirstName(event.target.value)}
                          placeholder="Escribe tu nombre"
                          className={eaNameInputClass}
                          autoFocus
                        />
                      </div>
                      <div>
                        <label htmlFor="ea-last-name" className="text-sm font-semibold text-[#1d2033]">
                          Apellido
                        </label>
                        <input
                          id="ea-last-name"
                          type="text"
                          value={draftLastName}
                          onChange={(event) => setDraftLastName(event.target.value)}
                          placeholder="Escribe tu apellido"
                          className={eaNameInputClass}
                        />
                      </div>
                    </div>
                    {nameError ? (
                      <p className="mt-3 text-sm text-[#dc2626]" role="alert">
                        {nameError}
                      </p>
                    ) : null}
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={handleCancelEditName}
                        disabled={savingName}
                        className="rounded-full border border-[#c5c9d0] bg-white px-6 py-2 text-sm font-medium text-[#1d2033] transition hover:bg-[#f9fafb] disabled:opacity-50"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleSaveName()}
                        disabled={savingName}
                        className="rounded-full bg-[#1d2033] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2d3148] disabled:opacity-50"
                      >
                        {savingName ? "Guardando…" : "Guardar"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#1d2033]">Nombre</p>
                      <p className="mt-1 text-sm text-[#4b5563]">
                        {formatDisplayName(account.firstName, account.lastName) ?? (
                          <span className="text-[#9ca3af]">—</span>
                        )}
                      </p>
                    </div>
                    <EaActionLink onClick={handleStartEditName}>Editar</EaActionLink>
                  </div>
                )}
              </div>

              <div className="border-b border-[#e5e7eb] py-5">
                {editingBirthDate ? (
                  <div>
                    <p className="text-sm font-semibold text-[#1d2033]">
                      Fecha de nacimiento (AAAA-MM-DD)
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      <div>
                        <label htmlFor="ea-birth-year" className="sr-only">
                          Año
                        </label>
                        <select
                          id="ea-birth-year"
                          value={draftBirthYear}
                          onChange={(event) => setDraftBirthYear(event.target.value)}
                          className={eaBirthSelectClass}
                        >
                          <option value="">Año</option>
                          {birthYears.map((y) => (
                            <option key={y} value={String(y)}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="ea-birth-month" className="sr-only">
                          Mes
                        </label>
                        <select
                          id="ea-birth-month"
                          value={draftBirthMonth}
                          onChange={(event) => setDraftBirthMonth(event.target.value)}
                          className={eaBirthSelectClass}
                        >
                          <option value="">Mes</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                            <option key={m} value={String(m)}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="ea-birth-day" className="sr-only">
                          Día
                        </label>
                        <select
                          id="ea-birth-day"
                          value={draftBirthDay}
                          onChange={(event) => setDraftBirthDay(event.target.value)}
                          className={eaBirthSelectClass}
                        >
                          <option value="">Día</option>
                          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                            <option key={d} value={String(d)}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {birthDateError ? (
                      <p className="mt-3 text-sm text-[#dc2626]" role="alert">
                        {birthDateError}
                      </p>
                    ) : null}
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={handleCancelEditBirthDate}
                        disabled={savingBirthDate}
                        className="rounded-full border border-[#c5c9d0] bg-white px-6 py-2 text-sm font-medium text-[#1d2033] transition hover:bg-[#f9fafb] disabled:opacity-50"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleSaveBirthDate()}
                        disabled={savingBirthDate}
                        className="rounded-full bg-[#1d2033] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2d3148] disabled:opacity-50"
                      >
                        {savingBirthDate ? "Guardando…" : "Guardar"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#1d2033]">Fecha de nacimiento</p>
                      <p className="mt-1 text-sm text-[#4b5563]">
                        {showDob ? (
                          account.birthDate ? (
                            formatBirthDateDisplay(account.birthDate)
                          ) : (
                            <span className="text-[#9ca3af]">—</span>
                          )
                        ) : (
                          "••/••/••••"
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {account.birthDate ? (
                        <EaActionLink onClick={() => setShowDob((value) => !value)}>
                          {showDob ? "Ocultar" : "Mostrar"}
                        </EaActionLink>
                      ) : null}
                      <EaActionLink onClick={handleStartEditBirthDate}>Editar</EaActionLink>
                    </div>
                  </div>
                )}
              </div>

              <AccountFieldRow
                label="Dirección de correo electrónico"
                hint="Te recomendamos que utilices un correo electrónico que revises con frecuencia."
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span>{account.maskedEmail || "—"}</span>
                    {account.emailVerified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5e9] px-2 py-0.5 text-xs font-medium text-[#1a9e32]">
                        <IconCheckVerified />
                        Verificado
                      </span>
                    ) : null}
                  </div>
                  <EaActionLink>Editar</EaActionLink>
                </div>
              </AccountFieldRow>

              <div className="border-b border-[#e5e7eb] py-5">
                {phoneStep === "form" ? (
                  <div>
                    <p className="text-sm font-semibold text-[#1d2033]">Número de teléfono</p>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                      <div className="sm:w-[45%]">
                        <label htmlFor="ea-phone-country" className="sr-only">
                          Prefijo
                        </label>
                        <select
                          id="ea-phone-country"
                          value={draftDialCode}
                          onChange={(event) => setDraftDialCode(event.target.value)}
                          className={eaBirthSelectClass}
                        >
                          {PHONE_COUNTRY_OPTIONS.map((option) => (
                            <option key={option.iso} value={option.dialCode}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="min-w-0 flex-1">
                        <label htmlFor="ea-phone-number" className="sr-only">
                          Número de teléfono
                        </label>
                        <input
                          id="ea-phone-number"
                          type="tel"
                          inputMode="tel"
                          value={draftPhoneNumber}
                          onChange={(event) => setDraftPhoneNumber(event.target.value)}
                          placeholder="Introducir número de teléfono"
                          className={eaNameInputClass}
                          autoFocus
                        />
                      </div>
                    </div>
                    <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-[#6b7280]">
                      <IconInfo />
                      <span>
                        Enviaremos un código de verificación a este número de teléfono.
                      </span>
                    </p>
                    {phoneError ? (
                      <p className="mt-3 text-sm text-[#dc2626]" role="alert">
                        {phoneError}
                      </p>
                    ) : null}
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={handleCancelPhone}
                        disabled={sendingPhoneCode}
                        className="rounded-full border border-[#c5c9d0] bg-white px-6 py-2 text-sm font-medium text-[#1d2033] transition hover:bg-[#f9fafb] disabled:opacity-50"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleSendPhoneCode()}
                        disabled={sendingPhoneCode}
                        className="rounded-full bg-[#1d2033] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2d3148] disabled:opacity-50"
                      >
                        {sendingPhoneCode ? "Enviando…" : "Enviar código"}
                      </button>
                    </div>
                  </div>
                ) : phoneStep === "code" ? (
                  <div>
                    <p className="text-sm font-semibold text-[#1d2033]">Número de teléfono</p>
                    {phoneDevHint ? (
                      <p
                        className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900"
                        role="status"
                      >
                        {phoneDevHint}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm text-[#4b5563]">
                        Introduce el código de 6 dígitos enviado a{" "}
                        <span className="font-medium text-[#1d2033]">
                          {draftDialCode} {draftPhoneNumber.replace(/\D/g, "").slice(0, 2)}••••
                        </span>
                      </p>
                    )}
                    <input
                      id="ea-phone-code"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={draftPhoneCode}
                      onChange={(event) =>
                        setDraftPhoneCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      placeholder="000000"
                      className={cn(eaNameInputClass, "mt-3 max-w-[12rem] tracking-[0.35em]")}
                      autoFocus
                    />
                    {phoneError ? (
                      <p className="mt-3 text-sm text-[#dc2626]" role="alert">
                        {phoneError}
                      </p>
                    ) : null}
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setPhoneStep("form")}
                        disabled={verifyingPhoneCode}
                        className="rounded-full border border-[#c5c9d0] bg-white px-6 py-2 text-sm font-medium text-[#1d2033] transition hover:bg-[#f9fafb] disabled:opacity-50"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleVerifyPhoneCode()}
                        disabled={verifyingPhoneCode}
                        className="rounded-full bg-[#1d2033] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2d3148] disabled:opacity-50"
                      >
                        {verifyingPhoneCode ? "Verificando…" : "Verificar"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#1d2033]">Número de teléfono</p>
                        <p className="mt-1 text-sm text-[#4b5563]">
                          {account.phoneMasked ? (
                            <span className="flex flex-wrap items-center gap-2">
                              {account.phoneMasked}
                              {account.phoneVerified ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f5e9] px-2 py-0.5 text-xs font-medium text-[#1a9e32]">
                                  <IconCheckVerified />
                                  Verificado
                                </span>
                              ) : null}
                            </span>
                          ) : (
                            <span className="text-[#6b7280]">
                              No se ha añadido ningún número de teléfono.
                            </span>
                          )}
                        </p>
                      </div>
                      {account.phoneMasked ? (
                        <EaActionLink onClick={handleStartAddPhone}>Editar</EaActionLink>
                      ) : (
                        <EaActionLink onClick={handleStartAddPhone}>+ Añadir</EaActionLink>
                      )}
                    </div>
                    {!account.phoneMasked ? (
                      <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-[#6b7280]">
                        <IconInfo />
                        <span>
                          Un número de teléfono mejora y protege tu cuenta con EA.
                        </span>
                      </p>
                    ) : null}
                  </>
                )}
              </div>

              <AccountFieldRow label="Ajustes regionales">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p>País/región: {getCountryLabel(account.countryCode)}</p>
                    <p className="mt-0.5">Idioma: Español</p>
                  </div>
                  <EaActionLink>Editar</EaActionLink>
                </div>
              </AccountFieldRow>

              <div className="border-b border-[#e5e7eb] py-5">
                <p className="text-sm font-semibold text-[#1d2033]">Identidades de juego</p>
                <p className="mt-2 text-sm text-[#6b7280]">
                  Vincula tus cuentas de juego para acceder a tus progresos y recompensas.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-[#f3f4f6]">
                  <Image
                    src="/images/auth/ea-logo.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 opacity-80"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1d2033]">Need for Speed</p>
                  <p className="text-xs text-[#6b7280]">Cuenta vinculada</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
