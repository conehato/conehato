import { Category, CategoryEntity } from "@/models";
import { dbConnect } from "../dbConnect";

export async function getRootCategories() {
  await dbConnect();

  const categories = await Category.find({
    parent_id: { $exists: false },
  }).exec();

  return {
    count: categories.length,
    rows: categories.map<CategoryEntity>((category) => ({
      id: category._id.toString(),
      name: category.name,
    })),
  };
}
