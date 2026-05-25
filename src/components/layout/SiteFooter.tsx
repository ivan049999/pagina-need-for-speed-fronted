import Link from "next/link";
import { APP_NAME } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 py-8">
      <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-sm text-nfs-chrome">
        <p>© {new Date().getFullYear()} {APP_NAME}</p>
        <Link href="/news" className="hover:text-nfs-neon">
          Noticias
        </Link>
      </div>
    </footer>
  );
}
