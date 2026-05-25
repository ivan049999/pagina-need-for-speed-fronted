import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { getAllNews } from "@/features/news/services/newsService";

export async function NewsList() {
  const articles = await getAllNews();
  return (
    <div className="grid gap-6">
      {articles.map((article) => (
        <Link key={article.slug} href={`/news/${article.slug}`}>
          <Card>
            <h2 className="font-display text-xl">{article.title}</h2>
            <p className="text-nfs-chrome mt-2">{article.excerpt}</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
