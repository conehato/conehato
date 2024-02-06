import { Metadata } from "next";

import { ArticleList, ArticleView } from "@/components/article";
import { getArticle } from "@/services/article";

import { parseParamsCategoryId } from "../layout";

interface ArticleViewPageProps {
  params: { categoryId: string; articleId: string };
  searchParams: { page?: number; hot?: boolean };
}

export async function generateMetadata({
  params: { articleId },
}: ArticleViewPageProps): Promise<Metadata> {
  const article = await getArticle({ articleId });

  return {
    title: `${article.title} - コネハト`,
    description: article.contents,
  };
}

export default async function ArticleViewPage({
  params: { categoryId: _categoryId, articleId },
  searchParams,
}: ArticleViewPageProps) {
  const { categoryId } = parseParamsCategoryId(_categoryId);

  const article = await getArticle({
    articleId,
    incViews: true,
  });

  return (
    <div className="flex flex-col gap-3">
      <ArticleView article={article} />
      <ArticleList
        categoryId={categoryId}
        page={Number(searchParams.page || 1)}
        isHot={Boolean(searchParams.hot || false)}
      />
    </div>
  );
}
