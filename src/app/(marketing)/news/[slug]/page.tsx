import { notFound } from "next/navigation";
import { NewsArticle } from "@/features/news/components/NewsArticle";
import { getNewsBySlug } from "@/features/news/services/newsService";

type Props = { params: Promise<{ slug: string }> };

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();
  return <NewsArticle article={article} />;
}
