import { dayjsInitialization } from "@/lib/dayjs";
import { CommentsEntity } from "@/models/Comments";
import dayjs from "dayjs";
import { postComment } from "@/services/comment";
import { cn } from "@/lib/utils";
import { CommentChildrenForm } from "./CommentChildrenForm";

export interface CommentListItemProps {
  comment: CommentsEntity;
  articleId: string;
  categoryId: string;
}
export function CommentListItem({
  comment,
  articleId,
  categoryId,
}: CommentListItemProps) {
  dayjsInitialization();

  return (
    <CommentChildrenForm
      disable={comment.isChildren}
      defaultValues={{
        parentId: comment.id,
        articleId,
        categoryId,
        contents: "",
        name: "",
        password: "",
      }}
      onSubmit={postComment}
    >
      <div
        className={cn(
          "flex flex-col gap-2 px-3 py-2 border-b border-[#dfe1ee]",
          comment.isChildren ? " pl-9" : ""
        )}
      >
        <div className="flex gap-2 text-sm">
          <div>{comment.anonymous.name}</div>
          <div className="text-slate-500">
            {dayjs(comment.createdAt).fromNow()}
          </div>
        </div>
        <div>{comment.contents}</div>
      </div>
    </CommentChildrenForm>
  );
}
