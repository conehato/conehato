import { getRootCategories } from ".";

interface GetCategoryByIdReq {
  categoryId: string;
}
export async function getCategoryById({ categoryId }: GetCategoryByIdReq) {
  const { rows } = await getRootCategories();
  const category = rows.find((row) => row.id === categoryId);

  if (!category) throw new Error("Category does not exist.");

  return category;
}
