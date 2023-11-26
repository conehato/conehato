import { MetadataRoute } from "next";

import { getArticles } from "@/services/article";
import { getRootCategories } from "@/services/category";

const URL = "https://conehato.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = (await getRootCategories()).rows;
  const articles = (await getArticles({ page: 1, limit: 4900 })).rows;

  const categoriesSiteMap = categories.map<MetadataRoute.Sitemap[number]>(
    (category) => ({
      url: `${URL}/${category.id}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    })
  );

  const articlesSiteMap = articles.map<MetadataRoute.Sitemap[number]>(
    (article) => ({
      url: `${URL}/${article.category.id}/${article.id}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    })
  );

  return [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoriesSiteMap,
    ...articlesSiteMap,
  ];
}
