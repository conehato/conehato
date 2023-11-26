import { Articles, ArticleEntity } from "@/models";

import { anonymousNormalizing } from "./anonymousNormalizing";
import { categoryNormalizing } from "./categoryNormalizing";
import { commentsNormalizing } from "./commentsNormalizing";

export function articleNormalizing(article: Articles): ArticleEntity {
  return {
    id: article._id.toString(),
    user: null,
    anonymous: anonymousNormalizing(article.anonymous),
    title: article.title,
    contents: article.contents,
    comments: commentsNormalizing(article.comments),
    category: categoryNormalizing(article.category),
    views: article.views,
    createdAt: article.createdAt,
    isHot: article.isHot,
  };
}
