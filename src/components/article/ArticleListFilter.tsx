"use client";

import { PenSquare } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ArticleListFilterProps {
  isHot: boolean;
  categoryId?: string;
}
export function ArticleListFilter({
  isHot,
  categoryId,
}: ArticleListFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const _searchParams = useSearchParams();

  const setPage = (isHot: boolean) => {
    const searchParams = new URLSearchParams(_searchParams);
    if (isHot) {
      searchParams.set("hot", String(isHot));
    } else {
      searchParams.delete("hot");
    }
    router.push(`${pathname}?${searchParams}`);
  };

  return (
    <div className="flex justify-between items-center px-4 py-1 bg-slate-100">
      <div className="flex flex-row gap-2">
        <Button
          variant={isHot ? "secondary" : "outline"}
          className={cn("px-2 py-1 h-auto", isHot ? "" : "hover:bg-white")}
          onClick={() => setPage(false)}
        >
          최신
        </Button>
        <Button
          variant={isHot ? "outline" : "secondary"}
          className={cn("px-2 py-1 h-auto", isHot ? "hover:bg-white" : "")}
          onClick={() => setPage(true)}
        >
          화제
        </Button>
      </div>
      {categoryId && (
        <Link
          href={`/write${categoryId ? `?category=${categoryId}` : ""}`}
          className="flex items-center"
        >
          <Button variant="secondary" className="px-2 py-0 h-auto">
            <PenSquare className="h-6 w-6" />
          </Button>
        </Link>
      )}
    </div>
  );
}
