"use server";

import { revalidatePath } from "next/cache";

import { DeleteFormType } from "@/components/common";
import { compareHash } from "@/lib/hash";
import { Article } from "@/models";

import { dbConnect } from "../dbConnect";

export async function deleteComment(values: DeleteFormType) {
  await dbConnect();

  const article = await Article.findById(values.articleId).exec();

  if (!article) throw new Error("Article does not exist.");

  if (!values.commentId) throw new Error("Comment does not exist.");

  const commentIndex = article.comments.findIndex(
    (comment) => comment._id.toString() === values.commentId
  );

  if (commentIndex === -1) throw new Error("Comment does not exist.");

  const comment = article.comments[commentIndex];

  if (!process.env.DELETE_TEXT || values.password !== process.env.DELETE_TEXT) {
    if (!comment.anonymous.password) {
      return "管理者のみ削除可能です。";
    }

    if (!(await compareHash(values.password, comment.anonymous.password))) {
      return "パスワードが違います。";
    }
  }

  await Article.findByIdAndUpdate(values.articleId, {
    $pull: { comments: { _id: values.commentId } },
  }).exec();

  revalidatePath(`/${article.category}/${values.articleId}`);
}
