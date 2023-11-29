"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { ArticleFormType } from "@/components/article";
import { Article, ArticleEntity } from "@/models";

import { dbConnect } from "../dbConnect";

export async function postLike(values: ArticleEntity) {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  await dbConnect();

  const article = await Article.findById(values.id).exec();

  if (!article) throw new Error("Article does not exist.");

  let insertIndex: number | undefined = undefined;
  let userId: string = ip || "" // no-user-system
  
  if (article.likes.includes(userId)) {
    await Article.findByIdAndUpdate(values.id, {
        $pullAll: {
          likes: userId
        },
      }).exec();
  } else {
    await Article.findByIdAndUpdate(values.id, {
        $push: {
          likes: userId
        },
      }).exec();
  }
  
  revalidatePath(`/${values.category}/${article._id}`, "layout");
}
