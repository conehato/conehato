"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ArticleFormType } from "@/components/article";
import { getHash } from "@/lib/hash";
import { Article } from "@/models";

import { dbConnect } from "../dbConnect";
import { sendNotification } from "../notification";

export async function postArticle(values: ArticleFormType) {
  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  await dbConnect();

  const article = await Article.create({
    anonymous: {
      ip,
      name: values.name,
      password: values.password ? await getHash(values.password) : undefined,
    },
    title: values.title,
    contents: values.contents,
    category: values.category,
  });

  sendNotification({ title: values.title });
  revalidatePath(`/${values.category}`);
  redirect(`/${values.category}/${article._id}`);
}
