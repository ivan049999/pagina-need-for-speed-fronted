import { MOCK_NEWS } from "@/features/news/data/mockNews";
import type { NewsArticle } from "@/types/news";

export async function getAllNews(): Promise<NewsArticle[]> {
  return MOCK_NEWS;
}

export async function getLatestNews(limit: number): Promise<NewsArticle[]> {
  return MOCK_NEWS.slice(0, limit);
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
  return MOCK_NEWS.find((a) => a.slug === slug);
}
