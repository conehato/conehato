import { getArticles } from "@/services/article";
import { ArticleListItem } from "./ArticleListItem";
import { Pagination } from "../pagination";
import { getCategoryById } from "@/services/category";

interface ArticleListProps {
  categoryId: string;
  page?: number;
}
export async function ArticleList({ categoryId, page = 1 }: ArticleListProps) {
  const category = await getCategoryById({ categoryId });
  const { count, rows: articleList } = await getArticles({
    page,
    limit: 5,
    categoryId,
  });

  return (
    <div className="flex flex-col">
      <div className="flex h-full items-end">
        <h4 className="text-lg font-semibold">{category.name}</h4>
      </div>

      <div className="flex flex-col">
        {articleList.map((article) => (
          <ArticleListItem
            key={article.id}
            article={article as any}
            categoryId={categoryId}
            page={page}
          />
        ))}
      </div>

      <Pagination count={count} limit={5} page={page} setPage={() => {}} />
    </div>
  );
}
