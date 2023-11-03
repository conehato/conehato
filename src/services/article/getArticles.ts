import { Article } from "@/models";
import { dbConnect } from "../dbConnect";

interface GetArticlesReq {
  page: number;
  limit: number;
  categoryId?: string;
}
export async function getArticles(req: GetArticlesReq) {
  await dbConnect();

  const count = await Article.find(
    req.categoryId ? { category: { _id: req.categoryId } } : {}
  )
    .countDocuments()
    .exec();

  const page = req.page - 1;
  const limit = req.limit;
  const skip = page * limit;

  const articles = await Article.find(
    req.categoryId ? { category: { _id: req.categoryId } } : {}
  )
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec();

  return { count, rows: articles };
}
