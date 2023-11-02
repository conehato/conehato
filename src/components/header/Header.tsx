import Link from "next/link";
import { getRootCategories } from "@/services/category";
import { Conehato } from "../brand";
import { NavigationMenu } from "../navigation";

interface HeaderProps {
  categoryId?: string;
}
export async function Header({ categoryId }: HeaderProps) {
  const { rows } = await getRootCategories();
  const category = categoryId
    ? rows.find((row) => row.id === categoryId)
    : undefined;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row h-16 items-center gap-4">
        <Link href="/">
          <Conehato />
        </Link>
        {category?.name && (
          <div className="flex h-full items-end">
            <h4 className="text-lg font-semibold">{category.name}</h4>
          </div>
        )}
      </div>
      {!categoryId && (
        <div className="h-16">
          <NavigationMenu categories={rows} />
        </div>
      )}
    </div>
  );
}
