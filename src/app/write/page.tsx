import { ArticleForm } from "@/components/article";
import { getRootCategories } from "@/services/category";
import { postArticle } from "@/services/article";

interface WritePageProps {
  searchParams: { category?: string };
}
export default async function WritePage({
  searchParams: { category: categoryId },
}: WritePageProps) {
  const { rows: categories } = await getRootCategories();

  return (
    <div>
      <ArticleForm
        defaultValues={{
          category: categories.find((category) => category.id === categoryId)
            ? categoryId || ""
            : "",
          name: "",
          password: "",
          title: "",
          contents: "",
        }}
        categories={categories}
        onSubmit={postArticle}
      />
    </div>
  );
}
