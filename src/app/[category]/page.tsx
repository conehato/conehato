import { getArticles } from "@/services/article";
import { getRootCategories } from "@/services/category";
import NotFound from "../not-found";

export default async function Post({
  params: { category: categoryId },
}: {
  params: { category: string };
}) {
  const { rows } = await getRootCategories();
  const category = rows.find((row) => row.id === categoryId);

  if (!category) return <NotFound />;

  return (
    <div>
      <PostList categoryId={category.id} />
    </div>
  );
}

interface PostListProps {
  categoryId: string;
}
async function PostList({ categoryId }: PostListProps) {
  const { count, rows } = await getArticles({ limit: 5, page: 1, categoryId });

  return (
    <div>
      <div>총 {count}개</div>
      <div>
        {rows.map((row) => (
          <div key={row.id}>{JSON.stringify(row)}</div>
        ))}
      </div>
    </div>
  );
}
