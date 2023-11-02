import { Article } from "@/models";
import { dbConnect } from "@/services/dbConnect";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const data = await req.json();
    const article = await Article.create(data);

    return Response.json(article, { status: 200 });
  } catch (e) {
    return Response.json(e, { status: 500 });
  }
}
