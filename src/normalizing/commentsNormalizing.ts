import { Comments, CommentsEntity } from "@/models";

import { anonymousNormalizing } from "./anonymousNormalizing";

export function commentsNormalizing(comments: Comments[]): CommentsEntity[] {
  return comments.map((comment) => ({
    user: null,
    id: comment._id.toString(),
    anonymous: anonymousNormalizing(comment.anonymous),
    contents: comment.contents,
    isChildren: comment.isChildren,
    createdAt: comment.createdAt,
  }));
}
