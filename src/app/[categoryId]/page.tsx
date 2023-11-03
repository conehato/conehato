import { ArticleList } from "@/components/article";

export default async function ArticleListPage({
  params: { categoryId },
  searchParams,
}: {
  params: { categoryId: string };
  searchParams: { page?: number };
}) {
  return (
    <div>
      <ArticleList categoryId={categoryId} page={searchParams.page} />
    </div>
  );
}
