import mongoose from "mongoose";

export interface ExpoPushTokens extends mongoose.Document {
  token: string;
}

const ExpoPushTokenSchema = new mongoose.Schema<ExpoPushTokens>({
  token: {
    type: String,
    required: [true, "토큰이 제공되지 없습니다."],
  },
});

export const ExpoPushToken =
  (mongoose.models?.ExpoPushToken as any as false) ||
  mongoose.model<ExpoPushTokens>("ExpoPushToken", ExpoPushTokenSchema);
