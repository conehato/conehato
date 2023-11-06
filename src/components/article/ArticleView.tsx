import { ArticleEntity } from "@/models";
import { dayjsInitialization } from "@/lib/dayjs";
import { getArticle } from "@/services/article";
import { CommentForm, CommentList } from "../comment";
import dayjs from "dayjs";
import { Separator } from "../ui/separator";
import { postComment } from "@/services/comment";
import { ArticleViewContent } from "./ArticleViewContent";

interface ArticleViewProps {
  articleId: string;
}
export async function ArticleView({ articleId }: ArticleViewProps) {
  const article = (await getArticle({
    articleId,
    incViews: true,
  })) as any as ArticleEntity;

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

      <ArticleViewContent content={article.contents} />

      <CommentList comments={article.comments} />
      <CommentForm
        defaultValues={{
          articleId: article.id,
          categoryId: article.category as any as string,
          contents: "",
          name: "",
          password: "",
        }}
        onSubmit={postComment}
      />
    </div>
  );
}
