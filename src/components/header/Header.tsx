import Link from "next/link";
import { PenSquare } from "lucide-react";
import { getRootCategories } from "@/services/category";
import { Conehato } from "../brand";
import { NavigationMenu } from "../navigation";
import { Button } from "../ui/button";

interface HeaderProps {
  categoryId?: string;
  hideNavigationMenu?: boolean;
}
export async function Header({ categoryId, hideNavigationMenu }: HeaderProps) {
  const { rows } = await getRootCategories();
  const category = categoryId
    ? rows.find((row) => row.id === categoryId)
    : undefined;

  return (
    <div className="flex flex-col w-full">
      <div className="flex h-16 justify-between items-center gap-4">
        <div className="flex h-16 items-center gap-4">
          <Link href="/">
            <Conehato.Title />
          </Link>
        </div>
      </div>
      {!hideNavigationMenu && (
        <NavigationMenu currentCategoryId={category?.id} categories={rows} />
      )}
    </div>
  );
}
