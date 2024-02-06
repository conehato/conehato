import dayjs from "dayjs";
import { CornerDownRight } from "lucide-react";

import { dayjsInitialization } from "@/lib/dayjs";
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
      <div className="flex flex-row items-center px-3 gap-2">
        {comment.isChildren && <CornerDownRight className="w-5 h-5" />}
        <div className="flex flex-col gap-1 py-1.5 border-b border-[#dfe1ee] w-full">
          <div className="flex justify-between">
            <div className="flex gap-1 text-sm">
              <div className="font-semibold">{`${comment.anonymous.name}(${comment.anonymous.ip})`}</div>
              <div className="text-slate-500">
                {dayjs(comment.createdAt).fromNow()}
              </div>
            </div>

            <DeleteForm
              defaultValues={{ articleId, commentId: comment.id, password: "" }}
              onSubmit={deleteComment}
            />
          </div>
          <div className="text-sm">{comment.contents}</div>
        </div>
      </div>
    </CommentChildrenForm>
  );
}
