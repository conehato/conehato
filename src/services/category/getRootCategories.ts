import { Category, CategoryEntity } from "@/models";
import { categoryNormalizing } from "@/normalizing";

import { dbConnect } from "../dbConnect";

export async function getRootCategories() {
  await dbConnect();

  const categories = await Category.find().exec();

  return {
    count: categories.length,
    rows: categories.map<CategoryEntity>(categoryNormalizing),
  };
}
