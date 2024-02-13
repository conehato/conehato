import { Metadata } from "next";

import { ArticleList } from "@/components/article";
import { parseParamsCategoryId } from "@/normalizing";
import { getCategoryById } from "@/services/category";

interface ArticleListPageProps {
  params: { categoryId: string };
  searchParams: { page?: number; hot?: boolean };
}

export async function generateMetadata({
  params: { categoryId: _categoryId },
}: ArticleListPageProps): Promise<Metadata> {
  const { categoryId } = parseParamsCategoryId(_categoryId);
  const category = await getCategoryById({ categoryId });

  return {
    title: `${category.name} - コネハト`,
    description: `${category.name} 書き込み一覧`,
  };
}

export default async function ArticleListPage({
  params: { categoryId: _categoryId },
  searchParams,
}: ArticleListPageProps) {
  const { categoryId } = parseParamsCategoryId(_categoryId);

  return (
    <ArticleList
      toWrite
      categoryId={categoryId}
      page={Number(searchParams.page || 1)}
      isHot={Boolean(searchParams.hot || false)}
    />
  );
}
