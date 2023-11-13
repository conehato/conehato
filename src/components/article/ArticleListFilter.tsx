"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ArticleListFilterProps {
  isHot: boolean;
}
export function ArticleListFilter({ isHot }: ArticleListFilterProps) {
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
    <div className="flex p-1 gap-1">
      <Button
        variant="link"
        className={cn("p-0 h-auto", isHot ? "" : "font-bold")}
        onClick={() => setPage(false)}
      >
        최신
      </Button>
      <div>/</div>
      <Button
        variant="link"
        className={cn("p-0 h-auto", isHot ? "font-bold" : "")}
        onClick={() => setPage(true)}
      >
        화제
      </Button>
    </div>
  );
}
