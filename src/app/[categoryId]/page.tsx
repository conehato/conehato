import { Metadata } from "next";

import { ArticleList } from "@/components/article";
import { getCategoryById } from "@/services/category";

interface ArticleListPageProps {
  params: { categoryId: string };
  searchParams: { page?: number; hot?: boolean };
}

export async function generateMetadata({
  params: { categoryId },
}: ArticleListPageProps): Promise<Metadata> {
  const category = await getCategoryById({ categoryId });

  return {
    title: `${category.name} - コネハト`,
    // TODO: 글 목록이라는 일본어로 작성해야함.
    description: `${category.name} 글 목록`,
  };
}

export default async function ArticleListPage({
  params: { categoryId },
  searchParams,
}: ArticleListPageProps) {
  return (
    <ArticleList
      toWrite
      categoryId={categoryId}
      page={Number(searchParams.page || 1)}
      isHot={Boolean(searchParams.hot || false)}
    />
  );
}
