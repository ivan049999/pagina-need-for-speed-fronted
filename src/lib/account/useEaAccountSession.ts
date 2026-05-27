"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  createElement,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AUTH_SESSION_CHANGE_EVENT,
  clearAuthSession,
  getAuthSession,
} from "@/lib/auth-session";
import { maskEmail } from "@/lib/auth/mask-email";
import { DEFAULT_LANGUAGE_CODE } from "@/lib/locales/language-options";

const API_BASE_URL = "http://localhost:4000/api/v1";

export type AccountData = {
  pilotName: string;
  email: string;
  maskedEmail: string;
  memberSinceYear: number;
  emailVerified: boolean;
  firstName: string | null;
  lastName: string | null;
  birthDate: string | null;
  countryCode: string | null;
  languageCode: string;
  phoneMasked: string | null;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  secondaryEmailMasked: string | null;
  secondaryEmailVerified: boolean;
};

export function useEaAccountSession() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<AccountData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
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
        firstName?: string | null;
        lastName?: string | null;
        birthDate?: string | null;
        countryCode?: string | null;
        languageCode?: string;
        phoneMasked?: string | null;
        phoneVerified?: boolean;
        twoFactorEnabled?: boolean;
        secondaryEmailMasked?: string | null;
        secondaryEmailVerified?: boolean;
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
        languageCode: data.languageCode ?? DEFAULT_LANGUAGE_CODE,
        phoneMasked: data.phoneMasked ?? null,
        phoneVerified: data.phoneVerified ?? false,
        twoFactorEnabled: data.twoFactorEnabled ?? false,
        secondaryEmailMasked: data.secondaryEmailMasked ?? null,
        secondaryEmailVerified: data.secondaryEmailVerified ?? false,
      });
    } catch {
      setAccount({
        pilotName: session.pilotName || "Piloto",
        email: "",
        maskedEmail: "",
        memberSinceYear: new Date().getFullYear(),
        emailVerified: true,
        firstName: null,
        lastName: null,
        birthDate: null,
        countryCode: null,
        languageCode: DEFAULT_LANGUAGE_CODE,
        phoneMasked: null,
        phoneVerified: false,
        twoFactorEnabled: false,
        secondaryEmailMasked: null,
        secondaryEmailVerified: false,
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

  const handleLogout = useCallback(() => {
    if (isLoggingOut || !account) return;
    setMenuOpen(false);
    setIsLoggingOut(true);
  }, [isLoggingOut, account]);

  const handleLogoutComplete = useCallback(() => {
    clearAuthSession();
    setIsLoggingOut(false);
    router.push("/");
    router.refresh();
  }, [router]);

  return {
    loading,
    account,
    setAccount,
    menuOpen,
    setMenuOpen,
    menuRef,
    isLoggingOut,
    handleLogout,
    handleLogoutComplete,
  };
}

export type EaAccountSessionValue = ReturnType<typeof useEaAccountSession>;

const EaAccountContext = createContext<EaAccountSessionValue | null>(null);

export function EaAccountProvider({ children }: { children: ReactNode }) {
  const value = useEaAccountSession();
  return createElement(EaAccountContext.Provider, { value }, children);
}

export function useEaAccountContext() {
  const ctx = useContext(EaAccountContext);
  if (!ctx) {
    throw new Error("useEaAccountContext debe usarse dentro de EaAccountProvider");
  }
  return ctx;
}
