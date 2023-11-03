"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { Article } from "@/models";
import { dbConnect } from "../dbConnect";
import { CommentFormType } from "@/components/comment";

export async function postComment(values: CommentFormType) {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  await dbConnect();

  const newComments = {
    anonymous: { ip, name: values.name, password: values.password },
    contents: values.contents,
  };
  await Article.findByIdAndUpdate(values.articleId, {
    $push: { comments: newComments },
  });

  revalidatePath(`/${values.categoryId}`, "layout");
}
