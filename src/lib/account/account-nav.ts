import type { ComponentType } from "react";
import { IconShield, IconUser } from "@/components/account/ea-account-icons";

export type AccountNavItem = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType;
};

export const ACCOUNT_SIDEBAR_ITEMS: AccountNavItem[] = [
  { id: "info", label: "Información de la cuenta", href: "/informacion-cuenta", icon: IconUser },
  { id: "privacy", label: "Privacidad y seguridad", href: "/privacidad-seguridad", icon: IconShield },
];

export const ACCOUNT_MENU_LINKS = ACCOUNT_SIDEBAR_ITEMS.map((item) => ({
  label: item.label,
  href: item.href,
}));
