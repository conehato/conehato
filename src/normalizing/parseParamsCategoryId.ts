export function parseParamsCategoryId<T extends string | (string | undefined)>(
  _categoryId: T
) {
  const categoryIds = _categoryId ? _categoryId.split("_") : [];
  const [categoryId, group] =
    categoryIds.length > 1
      ? [categoryIds[1], categoryIds[0]]
      : [categoryIds[0]];

  return { group, categoryId } as T extends undefined
    ? {
        group: T;
        categoryId: T;
      }
    : {
        group: T | undefined;
        categoryId: T;
      };
}
