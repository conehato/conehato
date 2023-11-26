import { ArticleForm } from "@/components/article";
import { postArticle } from "@/services/article";
import { getRootCategories } from "@/services/category";

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
          name: "ああ",
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
