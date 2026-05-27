import type { ComponentType } from "react";
import {
  IconFamily,
  IconMail,
  IconShield,
  IconStar,
  IconUser,
  IconWallet,
} from "@/components/account/ea-account-icons";

export type AccountNavItem = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType;
};

export const ACCOUNT_SIDEBAR_ITEMS: AccountNavItem[] = [
  { id: "info", label: "Información de la cuenta", href: "/informacion-cuenta", icon: IconUser },
  { id: "privacy", label: "Privacidad y seguridad", href: "/privacidad-seguridad", icon: IconShield },
  { id: "comms", label: "Preferencias de comunicación", href: "#", icon: IconMail },
  { id: "wallet", label: "Pago y Monedero", href: "#", icon: IconWallet },
  { id: "family", label: "Gestión de la familia", href: "#", icon: IconFamily },
  { id: "subs", label: "Membresías y suscripciones", href: "#", icon: IconStar },
];

export const ACCOUNT_MENU_LINKS = ACCOUNT_SIDEBAR_ITEMS.filter((item) => item.href !== "#").map(
  (item) => ({ label: item.label, href: item.href })
);
