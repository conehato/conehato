import { Category, CategoryEntity } from "@/models";

import { dbConnect } from "../dbConnect";

export async function getRootCategories() {
  await dbConnect();

  const categories = await Category.find().exec();

  return {
    count: categories.length,
    rows: categories.map<CategoryEntity>((category) => ({
      id: category._id,
      name: category.name,
      group: category.group,
    })),
  };
}
