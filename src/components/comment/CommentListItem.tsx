import dayjs from "dayjs";

import { dayjsInitialization } from "@/lib/dayjs";
import { cn } from "@/lib/utils";
import { CommentsEntity } from "@/models";
import { postComment } from "@/services/comment";
import { deleteComment } from "@/services/comment/deleteComment";

import { CommentChildrenForm } from "./CommentChildrenForm";
import { DeleteForm } from "../common";

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
        name: "ああ",
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
        <div className="flex justify-between">
          <div className="flex gap-2 text-sm">
            <div>{`${comment.anonymous.name}(${comment.anonymous.ip})`}</div>
            <div className="text-slate-500">
              {dayjs(comment.createdAt).fromNow()}
            </div>
          </div>

          <DeleteForm
            defaultValues={{ articleId, commentId: comment.id, password: "" }}
            onSubmit={deleteComment}
          />
        </div>
        <div>{comment.contents}</div>
      </div>
    </CommentChildrenForm>
  );
}
