"use server";

import { revalidatePath } from "next/cache";

import { ArticleFormType } from "@/components/article";
import { Article, ArticleEntity } from "@/models";

import { dbConnect } from "../dbConnect";

export async function postLike(values: ArticleEntity, userId: string) {

  await dbConnect();

  const article = await Article.findById(values.id).exec();

  if (!article) throw new Error("Article does not exist.");

  let insertIndex: number | undefined = undefined;
  
  if (article.likes.includes(userId)) {
    // console.log('pull like')
    await Article.findByIdAndUpdate(values.id, {
        $pull: {
          likes: userId
        },
      }).exec();
  } else {
    // console.log('push like')
    await Article.findByIdAndUpdate(values.id, {
        $push: {
          likes: userId
        },
      }).exec();
  }
  revalidatePath(`/${article.category}/${article.id}`, 'page');
}
