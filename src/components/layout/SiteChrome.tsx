"use client";

import { usePathname } from "next/navigation";
import { ElectronicArtsBar } from "@/components/layout/ElectronicArtsBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

const UNBOUND_PREFIX = "/need-for-speed-unbound";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isUnboundLanding = pathname?.startsWith(UNBOUND_PREFIX) ?? false;

  if (isUnboundLanding) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="sticky top-0 z-50">
        <ElectronicArtsBar />
        <SiteHeader />
      </div>
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
