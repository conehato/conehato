import { CommentsEntity } from "@/models/Comments";
import dayjs from "dayjs";

interface CommentListItemProps {
  comment: CommentsEntity;
}
export function CommentListItem({ comment }: CommentListItemProps) {
  return (
    <div className="flex flex-col gap-2 p-2 border-b border-slate-200">
      <div className="flex gap-2 text-sm">
        <div>{comment.anonymous.name}</div>
        <div className="text-slate-500">
          {dayjs(comment.createdAt).fromNow()}
        </div>
      </div>
      <div>{comment.contents}</div>
    </div>
  );
}
