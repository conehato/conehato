import { Metadata } from "next";
import { ArticleList, ArticleView } from "@/components/article";
import { ArticleEntity } from "@/models";
import { getArticle } from "@/services/article";

interface ArticleViewPageProps {
  params: { categoryId: string; articleId: string };
  searchParams: { page?: number; hot?: boolean };
}

export async function generateMetadata({
  params: { articleId },
}: ArticleViewPageProps): Promise<Metadata> {
  const article = (await getArticle({ articleId })) as any as ArticleEntity;

  return {
    title: `${article.title} - コネハト`,
    description: article.contents,
  };
}

export default async function ArticleViewPage({
  params: { categoryId, articleId },
  searchParams,
}: ArticleViewPageProps) {
  return (
    <div className="flex flex-col gap-3">
      <ArticleView articleId={articleId} />
      <ArticleList
        categoryId={categoryId}
        page={Number(searchParams.page || 1)}
        isHot={Boolean(searchParams.hot || false)}
      />
    </div>
  );
}
