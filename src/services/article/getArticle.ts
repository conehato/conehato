import { revalidatePath } from "next/cache";

import { Article } from "@/models";

import { dbConnect } from "../dbConnect";

interface GetArticleReq {
  articleId: string;
  incViews?: boolean;
}
export async function getArticle({ articleId, incViews }: GetArticleReq) {
  await dbConnect();

  const article = await Article.findByIdAndUpdate(
    articleId,
    incViews ? { $inc: { views: 1 } } : {},
    { new: true }
  ).exec();

  revalidatePath(article?.category ? `/${article.category}` : "/", "layout");

  return article;
}
