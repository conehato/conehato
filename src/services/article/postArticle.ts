"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ArticleFormType } from "@/components/article";
import { Article } from "@/models";

import { dbConnect } from "../dbConnect";

export async function postArticle(values: ArticleFormType) {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  await dbConnect();

  const article = await Article.create({
    anonymous: { ip, name: values.name, password: values.password },
    title: values.title,
    contents: values.contents,
    category: values.category,
  });

  revalidatePath(`/${values.category}`);
  redirect(`/${values.category}/${article._id}`);
}
