import Link from "next/link";
import { PenSquare } from "lucide-react";
import { getRootCategories } from "@/services/category";
import { Conehato } from "../brand";
import { NavigationMenu } from "../navigation";
import { Button } from "../ui/button";

interface HeaderProps {
  categoryId?: string;
  toWrite?: boolean;
  hideNavigationMenu?: boolean;
}
export async function Header({
  categoryId,
  toWrite,
  hideNavigationMenu,
}: HeaderProps) {
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
          {category?.name && (
            <Link href={`/${category.id}`} className="flex h-full items-end">
              <h4 className="text-lg font-semibold">{category.name}</h4>
            </Link>
          )}
        </div>
        {toWrite && (
          <Link href={`/write${categoryId ? `?category=${categoryId}` : ""}`}>
            <Button variant="secondary">
              <PenSquare className="mr-2 h-4 w-4" /> 글 작성
            </Button>
          </Link>
        )}
      </div>
      {!categoryId && !hideNavigationMenu && (
        <NavigationMenu categories={rows} />
      )}
    </div>
  );
}
