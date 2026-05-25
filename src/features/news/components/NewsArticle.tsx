import type { NewsArticle as NewsArticleType } from "@/types/news";

type Props = { article: NewsArticleType };

export function NewsArticle({ article }: Props) {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <time className="text-sm text-nfs-chrome">{article.publishedAt}</time>
      <h1 className="font-display text-4xl mt-2 mb-6">{article.title}</h1>
      <div className="prose prose-invert text-nfs-chrome">{article.content}</div>
    </article>
  );
}
