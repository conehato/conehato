import { Article } from "@/models";
import { dbConnect } from "../dbConnect";

interface GetArticleReq {
  articleId: string;
}
export async function getArticle(req: GetArticleReq) {
  await dbConnect();

  return await Article.findById(req.articleId).exec();
}
