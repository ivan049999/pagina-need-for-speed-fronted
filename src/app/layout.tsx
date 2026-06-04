import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "@/app/globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Providers } from "@/components/providers/Providers";

const nfsFont = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nfs",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Need for Speed",
    template: "%s | Need for Speed",
  },
  description: "Explora coches, garaje y clasificaciones del universo NFS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={nfsFont.variable}>
      <body className="font-body antialiased bg-nfs-asphalt text-white">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
