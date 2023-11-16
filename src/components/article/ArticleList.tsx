import { getArticles } from "@/services/article";
import { ArticleListItem } from "./ArticleListItem";
import { Pagination } from "../pagination";
import { getCategoryById } from "@/services/category";
import { ArticleListFilter } from "./ArticleListFilter";

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
    limit: 2,
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
        {articleList.map((article) => (
          <ArticleListItem
            key={article.id}
            article={article as any}
            page={page}
          />
        ))}
      </div>

      <Pagination count={count} limit={2} page={page} />
    </div>
  );
}
