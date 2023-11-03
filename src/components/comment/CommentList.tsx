import { CommentsEntity } from "@/models/Comments";
import { CommentListItem } from "./CommentListItem";

interface CommentListProps {
  comments: CommentsEntity[];
}
export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="flex flex-col">
      <div className="flex h-full items-end">
        <h4 className="text-lg font-semibold">댓글</h4>
      </div>

      <div className="flex flex-col">
        {comments.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
