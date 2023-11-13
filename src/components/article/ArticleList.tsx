import { getArticles } from "@/services/article";
import { ArticleListItem } from "./ArticleListItem";
import { Pagination } from "../pagination";
import { getCategoryById } from "@/services/category";
import { ArticleListFilter } from "./ArticleListFilter";

interface ArticleListProps {
  categoryId?: string;
  page?: number;
  isHot?: boolean;
}
export async function ArticleList({
  categoryId,
  page = 1,
  isHot = false,
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
      <div className="flex border-b border-slate-200 items-center justify-between">
        <div className="flex items-end p-1 gap-3">
          <h4 className="text-lg font-semibold">{category.name || "전체"}</h4>
          <div className="text-sm">{page}페이지</div>
        </div>
        <ArticleListFilter isHot={isHot} />
      </div>

      <div className="flex flex-col">
        {articleList.map((article) => (
          <ArticleListItem
            key={article.id}
            article={article as any}
            page={page}
          />
        ))}
      </div>

      <Pagination count={count} limit={30} page={page} />
    </div>
  );
}
