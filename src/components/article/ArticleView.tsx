import dayjs from "dayjs";

import { dayjsInitialization } from "@/lib/dayjs";
import { ArticleEntity } from "@/models";
import { getArticle } from "@/services/article";
import { postComment } from "@/services/comment";

import { ArticleViewContent } from "./ArticleViewContent";
import { CommentForm, CommentList } from "../comment";
import { Separator } from "../ui/separator";

interface ArticleViewProps {
  articleId: string;
}

export async function ArticleView({ articleId }: ArticleViewProps) {
  const article = await getArticle({
    articleId,
    incViews: true,
  });

  dayjsInitialization();

  return (
    <div className="flex flex-col gap-2 rounded">
      <div className="flex flex-col border-b-4 px-3 py-2">
        <div className="text-lg font-semibold">{article.title}</div>

        <div className="flex h-5 items-center text-sm gap-2">
          <div>{`${article.anonymous.name}(${article.anonymous.ip})`}</div>
          <Separator orientation="vertical" />
          <div>{dayjs(article.createdAt).fromNow()}</div>
          <Separator orientation="vertical" />
          <div>{article.views}</div>
        </div>
      </div>

      <ArticleViewContent content={article.contents} />

      <CommentList
        comments={article.comments}
        articleId={article.id}
        categoryId={article.category.id}
      />
      <CommentForm
        defaultValues={{
          articleId: article.id,
          categoryId: article.category.id,
          contents: "",
          name: "ああ",
          password: "",
          parentId: "",
        }}
        onSubmit={postComment}
      />
    </div>
  );
}
