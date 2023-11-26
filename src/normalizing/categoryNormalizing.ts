import { Categories, CategoryEntity } from "@/models";

export function categoryNormalizing(category: Categories): CategoryEntity {
  const test = {
    id: category._id,
    name: category.name,
    group: category.group,
  };

  return test;
}
