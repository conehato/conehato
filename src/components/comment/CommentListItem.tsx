import dayjs from "dayjs";
import { Dispatch } from 'react'
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
  selectedCommentId: string;
  setSelectedCommentId: Dispatch<React.SetStateAction<string>>;
}
export function CommentListItem({
  comment,
  articleId,
  categoryId,
  selectedCommentId,
  setSelectedCommentId,
}: CommentListItemProps) {
  dayjsInitialization();

  return (
    <CommentChildrenForm
      defaultValues={{
        parentId: comment.id,
        articleId,
        categoryId,
        contents: "",
        name: "ああ",
        password: "",
      }}
      selectedCommentId={selectedCommentId}
      onSubmit={postComment}
      dismissCommentForm={() => setSelectedCommentId('')}
    >
      <div className="flex flex-row items-center px-3 gap-2">
        {comment.isChildren && <CornerDownRight className="w-5 h-5" />}
        <div className="flex flex-col gap-1 py-2 border-b border-[#dfe1ee] w-full">
          <div className="flex justify-between">
            <div className="flex gap-1 text-sm">
              <div className="flex">
              <div className="font-semibold text-slate-700">{`${comment.anonymous.name}`}</div>
              <div className="my-auto mx-1 text-slate-400 text-xs">{`(${comment.anonymous.ip})`}</div>
              </div>
              <div className="my-auto text-slate-500 text-xs">
                {dayjs(comment.createdAt).fromNow()}
              </div>
            </div>
            <div className="flex text-xs text-slate-500 cursor-pointer">
              {!comment.isChildren && <div className="" onClick={() => setSelectedCommentId(comment.id)}>답글</div>}
            <DeleteForm
              defaultValues={{ articleId, commentId: comment.id, password: "" }}
              onSubmit={deleteComment}
            />
            </div>
          </div>
          <div className="text-sm pb-1">{comment.contents}</div>
        </div>
      </div>
    </CommentChildrenForm>
  );
}
