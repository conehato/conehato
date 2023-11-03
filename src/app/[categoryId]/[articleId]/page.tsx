import NotFound from "@/app/not-found";
import { ArticleList, ArticleView } from "@/components/article";
import { getRootCategories } from "@/services/category";

export default async function ArticleViewPage({
  params: { categoryId, articleId },
  searchParams,
}: {
  params: { categoryId: string; articleId: string };
  searchParams: { page?: number };
}) {
  const { rows } = await getRootCategories();
  const category = rows.find((row) => row.id === categoryId);

  if (!category)
    return (
      <div className="flex flex-1 justify-center">
        <NotFound />
      </div>
    );

  return (
    <div className="flex flex-col gap-3">
      <ArticleView articleId={articleId} />
      <ArticleList categoryId={categoryId} page={searchParams.page} />
    </div>
  );
}
