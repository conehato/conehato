import { getRootCategories } from "@/services/category";
import { MetadataRoute } from "next";

const URL = "https://conehato.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = (await getRootCategories()).rows;
  const categoriesSiteMap = categories.map<MetadataRoute.Sitemap[number]>(
    (category) => ({
      url: `${URL}/${category.id}`,
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
  ];
}
