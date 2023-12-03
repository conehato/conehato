import { CommentsEntity } from "@/models";

import { CommentListItem, CommentListItemProps } from "./CommentListItem";

interface CommentListProps extends Omit<CommentListItemProps, "comment"> {
  comments: CommentsEntity[];
}
export function CommentList({ comments, ...props }: CommentListProps) {
  return (
    <div className="flex flex-col">
      <div className="flex h-full items-end px-3 py-1">
        <p className="text-base font-bold">{`コメント  ${comments.length}`}</p>
      </div>
      <div className="flex flex-col">
        {comments.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} {...props} />
        ))}
      </div>
    </div>
  );
}
