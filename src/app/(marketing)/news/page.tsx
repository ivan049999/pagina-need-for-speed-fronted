import type { Metadata } from "next";
import { NewsList } from "@/features/news/components/NewsList";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Últimas novedades del universo Need for Speed.",
};

export default function NewsPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="font-display text-4xl mb-8">Noticias</h1>
      <NewsList />
    </section>
  );
}
