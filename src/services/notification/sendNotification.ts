import { Expo } from "expo-server-sdk";

import { getExpoPushTokens } from "./getExpoPushTokens";

interface SendNotificationProps {
  title: string;
}
export async function sendNotification({ title }: SendNotificationProps) {
  const { rows } = await getExpoPushTokens();

  const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
  const messages = [];

  for (let { token: pushToken } of rows) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound: "default" as const,
      body: title,
    });
  }

  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
}
