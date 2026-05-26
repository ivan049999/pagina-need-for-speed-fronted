"use client";

import { SettingsProvider } from "@/context/SettingsContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>;
}
