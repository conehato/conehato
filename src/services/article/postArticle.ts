"use server";

import { Article } from "@/models";
import { dbConnect } from "../dbConnect";
import { ArticleFormType } from "@/components/article";
import { headers } from "next/headers";

export async function postArticle(values: ArticleFormType) {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  await dbConnect();

  console.log("postArticle", ip, values);

  await Article.create({
    anonymous: {
      ip: ip,
      name: values.name,
      password: values.password,
    },
    title: values.title,
    contents: values.contents,
    category: values.category,
  });
}
