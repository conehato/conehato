import Link from "next/link";
import { getCategoryById, getRootCategories } from "@/services/category";
import { Conehato } from "../brand";
import { NavigationMenu } from "../navigation";

interface HeaderProps {
  categoryId?: string;
}
export async function Header({ categoryId }: HeaderProps) {
  const { subCategories, ...category } = categoryId
    ? await getCategoryById(categoryId)
    : { subCategories: (await getRootCategories()).rows, name: undefined };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row h-16 items-center gap-4">
        <Link href="/">
          <Conehato />
        </Link>
        {category.name && (
          <div className="flex h-full items-end">
            <h4 className="text-lg font-semibold">{category.name}</h4>
          </div>
        )}
      </div>
      {!!subCategories.length && (
        <div className="h-16">
          <NavigationMenu categories={subCategories} />
        </div>
      )}
    </div>
  );
}
