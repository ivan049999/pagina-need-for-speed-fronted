"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
import { maskEmail } from "@/lib/auth/mask-email";
import { cn } from "@/lib/utils/cn";

const API_BASE_URL = "http://localhost:4000/api/v1";

type AccountData = {
  pilotName: string;
  email: string;
  maskedEmail: string;
  memberSinceYear: number;
  emailVerified: boolean;
};

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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      });
    } catch {
      const email = "";
      setAccount({
        pilotName: session.pilotName || "Piloto",
        email,
        maskedEmail: "",
        memberSinceYear: new Date().getFullYear(),
        emailVerified: true,
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

              <AccountFieldRow label="Nombre">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[#9ca3af]">—</span>
                  <EaActionLink>Editar</EaActionLink>
                </div>
              </AccountFieldRow>

              <AccountFieldRow label="Fecha de nacimiento">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span>{showDob ? "01/01/1990" : "••/••/••••"}</span>
                  <div className="flex items-center gap-4">
                    <EaActionLink onClick={() => setShowDob((value) => !value)}>
                      {showDob ? "Ocultar" : "Mostrar"}
                    </EaActionLink>
                    <EaActionLink>Editar</EaActionLink>
                  </div>
                </div>
              </AccountFieldRow>

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

              <AccountFieldRow
                label="Número de teléfono"
                hint="Un número de teléfono mejora y protege tu cuenta con EA."
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[#6b7280]">
                    No se ha añadido ningún número de teléfono.
                  </span>
                  <EaActionLink>+ Añadir</EaActionLink>
                </div>
              </AccountFieldRow>

              <AccountFieldRow label="Ajustes regionales">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p>País/región: España</p>
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
