import { Header } from "@/components/header";

export default function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { categoryId?: string };
}) {
  const { categoryId, group } = parseParamsCategoryId(params?.categoryId);

  return (
    <main className="flex flex-col min-h-full">
      <Header group={group} categoryId={categoryId} />
      {children}
    </main>
  );
}

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
