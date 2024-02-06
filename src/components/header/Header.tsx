import Link from "next/link";

import { getCategoriesForNavigation } from "@/services/category";

import { Conehato } from "../brand";
import { NavigationMenu } from "../navigation";

interface HeaderProps {
  group?: string;
  categoryId?: string;
  hideNavigationMenu?: boolean;
}
export async function Header({
  group,
  categoryId,
  hideNavigationMenu,
}: HeaderProps) {
  const categories = await getCategoriesForNavigation(group);

  return (
    <div className="flex flex-col w-full">
      <div className="flex h-12 justify-center items-center">
        <Link href="/">
          <Conehato.Title />
        </Link>
      </div>
      {!hideNavigationMenu && (
        <NavigationMenu
          currentCategoryId={categoryId}
          categories={categories}
        />
      )}
    </div>
  );
}
