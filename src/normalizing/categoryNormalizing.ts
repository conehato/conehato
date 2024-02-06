import { Categories, CategoryEntity } from "@/models";

export function categoryNormalizing(category: Categories): CategoryEntity {
  return {
    id: category._id,
    name: category.name,
    group: category.group,
    href: `${category.group ? `${category.group}_` : ""}${category._id}`,
  };
}
