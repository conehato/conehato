"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { DeleteFormType } from "@/components/common";
import { compareHash } from "@/lib/hash";
import { Article } from "@/models";

import { dbConnect } from "../dbConnect";

export async function deleteArticle(values: DeleteFormType) {
  await dbConnect();

  const article = await Article.findById(values.articleId).exec();

  if (!article) throw new Error("Article does not exist.");

  if (!process.env.DELETE_TEXT || values.password !== process.env.DELETE_TEXT) {
    if (!article.anonymous.password) {
      return "管理者のみ削除可能です。";
    }

    if (!(await compareHash(values.password, article.anonymous.password))) {
      return "パスワードが違います。";
    }
  }

  await Article.deleteOne({ _id: values.articleId }).exec();

  revalidatePath(`/${article.category}`);
  redirect(`/${article.category}`);
}
