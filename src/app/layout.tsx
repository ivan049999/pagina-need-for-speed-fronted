import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ElectronicArtsBar } from "@/components/layout/ElectronicArtsBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

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
    <html lang="es">
      <body className={`${inter.variable} font-body antialiased bg-nfs-asphalt text-white`}>
        <div className="sticky top-0 z-50">
          <ElectronicArtsBar />
          <SiteHeader />
        </div>
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
