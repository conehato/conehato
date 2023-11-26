"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";

interface PaginationProps {
  count: number;
  limit: number;
  page: number;
  padding?: number;
}
export function Pagination({
  count,
  limit,
  page,
  padding = 3,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const _searchParams = useSearchParams();

  const setPage = (page: number) => {
    const searchParams = new URLSearchParams(_searchParams);
    searchParams.set("page", String(page));
    router.push(`${pathname}?${searchParams}`);
  };

  const pageCount = Math.ceil(count / limit);

  const allList = [...new Array(pageCount)].map((_, index) => index + 1);
  const centerList = allList.slice(
    Math.max(page - padding, 0),
    Math.min(page + padding - 1, pageCount)
  );
  const forwardList = allList.slice(0, Math.max(page - padding, 0)).slice(0, 2);
  const backwardListTemp = allList.slice(
    Math.min(page + padding - 1, pageCount),
    pageCount
  );
  const backwardList = backwardListTemp.slice(backwardListTemp.length - 2);

  return (
    <div className="flex flex-1 items-center justify-between py-2 px-4">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => setPage(1)}
        className="py-1.5 px-2 h-auto"
      >
        <ChevronLeft className="mr-1 h-4 w-4" /> 처음
      </Button>

      <div className="flex">
        <nav
          className="isolate inline-flex -space-x-px rounded-md gap-1"
          aria-label="Pagination"
        >
          {/* {forwardList.map((index, i) =>
            i === 0 ? (
              <Button
                key={index}
                variant={index === page ? "secondary" : ""}
                onClick={() => setPage(index)}
              >
                {index}
              </Button>
            ) : (
              <PaginationItemEllipsis key={index} />
            )
          )} */}
          {centerList.map((index) => (
            <Button
              key={index}
              variant={index === page ? "groupSelected" : "group"}
              onClick={() => setPage(index)}
              className="w-8 h-8 p-0"
            >
              {index}
            </Button>
          ))}
          {/* {backwardList.map((index, i) =>
            i === 0 && backwardList.length === 2 ? (
              <PaginationItemEllipsis key={index} />
            ) : (
              <Button
                key={index}
                variant={index === page ? "secondary" : ""}
                onClick={() => setPage(index)}
              >
                {index}
              </Button>
            )
          )} */}
        </nav>
      </div>

      <Button
        variant="outline"
        disabled={page >= pageCount}
        onClick={() => setPage(page + 1)}
        className="py-1.5 px-2 h-auto"
      >
        다음 <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}

function PaginationItemEllipsis() {
  return (
    <Button className="cursor-auto" variant="secondary">
      ...
    </Button>
  );
}
