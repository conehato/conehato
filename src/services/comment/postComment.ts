"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { Article } from "@/models";
import { dbConnect } from "../dbConnect";
import { CommentFormType } from "@/components/comment";
import { Comments } from "@/models/Comments";

export async function postComment(values: CommentFormType) {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  await dbConnect();

  const newComments = {
    anonymous: { ip, name: values.name, password: values.password },
    contents: values.contents,
    isChildren: Boolean(values.parentId),
  } as Comments;

  const article = await Article.findById(values.articleId).exec();

  if (!article) throw new Error("Article does not exist.");

  let insertIndex: number | undefined = undefined;
  if (values.parentId) {
    let parentCommentIndex: number | undefined = undefined;
    const _insertIndex = article.comments.findIndex((comment, index) => {
      if (
        parentCommentIndex === undefined &&
        comment._id.toString() === values.parentId
      ) {
        parentCommentIndex = index;
        return false;
      }
      if (parentCommentIndex !== undefined) {
        return !comment.isChildren;
      }
      return false;
    });

    if (parentCommentIndex === undefined)
      throw new Error("parent Comment does not exist.");

    insertIndex = _insertIndex === -1 ? undefined : _insertIndex;
  }

  await Article.findByIdAndUpdate(values.articleId, {
    $push: {
      comments: {
        $each: [newComments],
        $position: insertIndex,
      },
    },
  }).exec();

  revalidatePath(`/${values.categoryId}`, "layout");
}
