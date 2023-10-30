import { Category, CategoryEntity } from "@/models";
import { dbConnect } from "../dbConnect";

export async function getCategoryById(
  id: string
): Promise<CategoryEntity & { subCategories: CategoryEntity[] }> {
  await dbConnect();

  const category = await Category.findById(id).exec();

  if (!category) throw new Error("Category does not exist.");

  const subCategories = await Category.find({ parent_id: category._id }).exec();

  return {
    id: category._id.toString(),
    name: category.name,
    subCategories: subCategories.map((category) => ({
      id: category._id.toString(),
      name: category.name,
    })),
  };
}
