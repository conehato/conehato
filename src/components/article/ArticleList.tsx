import { getArticles } from "@/services/article";
import { getCategoryById } from "@/services/category";

import { ArticleListFilter } from "./ArticleListFilter";
import { ArticleListItem } from "./ArticleListItem";
import { Pagination } from "../pagination";

interface ArticleListProps {
  categoryId?: string;
  page?: number;
  isHot?: boolean;
  toWrite?: boolean;
}
export async function ArticleList({
  categoryId,
  page = 1,
  isHot = false,
  toWrite = false,
}: ArticleListProps) {
  const category = categoryId
    ? await getCategoryById({ categoryId })
    : { name: undefined };
  const { count, rows: articleList } = await getArticles({
    page,
    limit: 30,
    categoryId,
    isHot,
  });

  return (
    <div className="flex flex-col">
      <ArticleListFilter
        isHot={isHot}
        categoryId={toWrite ? categoryId : undefined}
      />

      <div className="flex flex-col">
        {
          articleList.length ? articleList.map((article) => (
            <ArticleListItem
              key={article.id}
              article={article as any}
              page={page}
            />
          )) : <div className="w-full py-6 text-center">
            아직 해당 주제의 글이 없습니다.
          </div>}
      </div>

      <Pagination count={count} limit={30} page={page} />
    </div>
  );
}
