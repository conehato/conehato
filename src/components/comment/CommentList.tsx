import { CommentsEntity } from "@/models";

import { CommentListItem, CommentListItemProps } from "./CommentListItem";

interface CommentListProps extends Omit<CommentListItemProps, "comment"> {
  comments: CommentsEntity[];
}
export function CommentList({ comments, ...props }: CommentListProps) {
  return (
    <div className="flex flex-col">
      <div className="flex h-full items-end px-3 py-1 border-y-4">
        <h4 className="text-lg font-semibold">댓글</h4>
      </div>

      <div className="flex flex-col">
        {comments.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} {...props} />
        ))}
      </div>
    </div>
  );
}
