import Link from "next/link";
import { ArticleEntity } from "@/models";

import { Separator } from "../ui/separator";
import dayjs from "dayjs";

interface ArticleListItemProps {
  article: ArticleEntity;
  categoryId: string;
  page: number;
}
export function ArticleListItem({
  article,
  categoryId,
  page,
}: ArticleListItemProps) {
  return (
    <Link
      href={{ pathname: `/${categoryId}/${article.id}`, query: `page=${page}` }}
      className="flex flex-col p-2 border-b border-slate-200 hover:bg-slate-100 rounded"
    >
      <div className="flex h-7 items-center gap-2">
        <div>{article.title}</div>
        <div className="font-semibold">{article.comments.length}</div>
      </div>

      <div className="flex h-5 items-center text-sm gap-2">
        <div>{article.anonymous.name}</div>
        <Separator orientation="vertical" />
        <div>{dayjs(article.createdAt).fromNow()}</div>
        <Separator orientation="vertical" />
        <div>{article.views}</div>
      </div>
    </Link>
  );
}
