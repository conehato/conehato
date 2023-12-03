import dayjs from "dayjs";

import { dayjsInitialization } from "@/lib/dayjs";
import { deleteArticle } from "@/services/article";
import { ArticleEntity } from "@/models";
import { postComment } from "@/services/comment";
import { headers } from "next/headers";

import { ArticleViewContent } from "./ArticleViewContent";
import { ArticleLikeForm } from "./ArticleLikeForm"
import { CommentForm, CommentList } from "../comment";
import { DeleteForm } from "../common";
import { Separator } from "../ui/separator";

interface ArticleViewProps {
  article: ArticleEntity;
}

export function ArticleView({ article }: ArticleViewProps) {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");
  
  const userId = ip || "" // userID
  dayjsInitialization();

  return (
    <div className="flex flex-col gap-2 rounded">
      <div className="flex items-end border-b-4">
        <div className="flex flex-1 flex-col px-3 py-2">
          <div className="text-lg font-semibold">{article.title}</div>

          <div className="flex h-5 items-center text-sm gap-2">
            <div>{`${article.anonymous.name}(${article.anonymous.ip})`}</div>
            <Separator orientation="vertical" />
            <div>{dayjs(article.createdAt).fromNow()}</div>
            <Separator orientation="vertical" />
            <div>{article.views}</div>
          </div>
        </div>

        <DeleteForm
          defaultValues={{ articleId: article.id, password: "" }}
          onSubmit={deleteArticle}
        />
      </div>

      <ArticleViewContent content={article.contents} />
      <ArticleLikeForm article={article} userId={userId}/>
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
