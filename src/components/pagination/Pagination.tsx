"use client";

import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  padding = 2,
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
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {page !== 1 ? (
          <Button onClick={() => setPage(page - 1)}>Previous</Button>
        ) : (
          <div />
        )}
        {page < pageCount ? (
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        ) : (
          <div />
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {Math.min(count, page - 1 ? (page - 1) * limit : 1)}
            </span>{" "}
            to{" "}
            <span className="font-medium">{Math.min(count, page * limit)}</span>{" "}
            of <span className="font-medium">{count}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm gap-1"
            aria-label="Pagination"
          >
            {forwardList.map((index, i) =>
              i === 0 ? (
                <Button
                  key={index}
                  variant={index === page ? "default" : "secondary"}
                  onClick={() => setPage(index)}
                >
                  {index}
                </Button>
              ) : (
                <PaginationItemEllipsis key={index} />
              )
            )}
            {centerList.map((index) => (
              <Button
                key={index}
                variant={index === page ? "default" : "secondary"}
                onClick={() => setPage(index)}
              >
                {index}
              </Button>
            ))}
            {backwardList.map((index, i) =>
              i === 0 && backwardList.length === 2 ? (
                <PaginationItemEllipsis key={index} />
              ) : (
                <Button
                  key={index}
                  variant={index === page ? "default" : "secondary"}
                  onClick={() => setPage(index)}
                >
                  {index}
                </Button>
              )
            )}
          </nav>
        </div>
      </div>
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
