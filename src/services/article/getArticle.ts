import { revalidatePath } from "next/cache";

import { Article } from "@/models";
import { articleNormalizing } from "@/normalizing";

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
  )
    .populate("category")
    .exec();

  if (!article) throw new Error("Article does not exist.");

  console.log(article)
  revalidatePath(article?.category ? `/${article.category}` : "/", "layout");
  // revalidatePath(`/${article.category}/${article.id}`, "page");
  return articleNormalizing(article);
}
