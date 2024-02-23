import { ExpoPushToken } from "@/models";

import { dbConnect } from "../dbConnect";

export async function getExpoPushTokens() {
  await dbConnect();

  const expoPushTokens = await ExpoPushToken.find().exec();

  return {
    count: expoPushTokens.length,
    rows: expoPushTokens,
  };
}
