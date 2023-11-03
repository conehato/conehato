import { ArticleEntity } from "@/models";
import { dayjsInitialization } from "@/lib/dayjs";
import { getArticle } from "@/services/article";
import { CommentList } from "../comment";
import dayjs from "dayjs";
import { Separator } from "../ui/separator";

interface ArticleViewProps {
  articleId: string;
}
export async function ArticleView({ articleId }: ArticleViewProps) {
  const article = (await getArticle({ articleId })) as any as ArticleEntity;

  dayjsInitialization();

  return (
    <div className="flex flex-col gap-6 bg-slate-100 rounded p-3">
      <div className="flex flex-col">
        <div className="text-lg font-semibold">{article.title}</div>

        <div className="flex h-5 items-center text-sm gap-2">
          <div>{article.anonymous.name}</div>
          <Separator orientation="vertical" />
          <div>{dayjs(article.createdAt).fromNow()}</div>
          <Separator orientation="vertical" />
          <div>{article.views}</div>
        </div>
      </div>

      <div>{article.contents}</div>

      <CommentList comments={article.comments} />
    </div>
  );
}
