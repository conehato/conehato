import { Article } from "@/models";
import { articleNormalizing } from "@/normalizing";

import { dbConnect } from "../dbConnect";

interface GetArticlesReq {
  page: number;
  limit: number;
  categoryId?: string;
  isHot?: boolean;
}
export async function getArticles(req: GetArticlesReq) {
  await dbConnect();

  const query = {
    ...(req.categoryId ? { category: { _id: req.categoryId } } : {}),
    ...(req.isHot ? { isHot: true } : {}),
  };

  const count = await Article.find(query).countDocuments().exec();

  const page = req.page - 1;
  const limit = req.limit;
  const skip = page * limit;

  const articles = await Article.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("category")
    .exec();

  return { count, rows: articles.map(articleNormalizing) };
}
