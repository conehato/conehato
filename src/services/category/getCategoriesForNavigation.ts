import { CategoryEntity } from "@/models";

import { getRootCategories } from "./getRootCategories";

const categoryGroupNameObject: Record<string, string> = {
  game: "ゲーム",
};
export async function getCategoriesForNavigation(group?: string) {
  const categories = (await getRootCategories()).rows;

  return group
    ? categories.filter((category) => category.group === group)
    : categories.reduce((prev, curr) => {
        if (curr.group) {
          if (!prev.find((p) => p.group === curr.group))
            return [
              ...prev,
              {
                ...curr,
                name: categoryGroupNameObject[curr.group] || curr.group,
              },
            ];
          else return prev;
        }

        return [...prev, curr];
      }, [] as CategoryEntity[]);
}
