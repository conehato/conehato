import { ExpoPushToken } from "@/models";
import { dbConnect } from "@/services/dbConnect";
import { sendNotification } from "@/services/notification";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const data = await request.json();
    const expoPushToken =
      (await ExpoPushToken.findOne(data)) || (await ExpoPushToken.create(data));
    return Response.json(expoPushToken, { status: 200 });
  } catch (e) {
    return Response.json(e, { status: 500 });
  }
}
