import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { getLatestNews } from "@/features/news/services/newsService";

export async function LatestNews() {
  const articles = await getLatestNews(3);
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="font-display text-3xl mb-8">Últimas noticias</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.slug} href={`/news/${article.slug}`}>
            <Card className="hover:border-nfs-neon/30 transition">
              <time className="text-xs text-nfs-chrome">{article.publishedAt}</time>
              <h3 className="font-display mt-2">{article.title}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
