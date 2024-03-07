"use client";
import { useState } from "react";
import { CommentsEntity } from "@/models";

import { CommentListItem, CommentListItemProps } from "./CommentListItem";

interface CommentListProps extends Omit<CommentListItemProps, "comment"> {
  comments: CommentsEntity[];
}
export function CommentList({ comments, ...props }: CommentListProps) {
  const [selectedCommentId, setSelectedCommentId] = useState('');

  return (
    <div className="flex flex-col">
      <div className="flex w-full h-full items-end px-3 py-1 border-y bg-slate-50">
        <p className="text-base">{`コメント  ${comments.length}`}</p>
      </div>
      <div className="flex flex-col">
        {comments.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} {...props} selectedCommentId={selectedCommentId} setSelectedCommentId={setSelectedCommentId}/>
        ))}
      </div>
    </div>
  );
}
