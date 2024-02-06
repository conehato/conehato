import mongoose from "mongoose";

export interface CategoryEntity {
  id: string;
  name: string;
  group?: string;
  href: string;
}
export interface Categories extends mongoose.Document {
  _id: string;
  name: string;
  group?: string;
}

const CategorySchema = new mongoose.Schema<Categories>({
  _id: { type: String, required: [true, "카테고리의 키가 제공되지 없습니다."] },
  name: {
    type: String,
    required: [true, "카테고리의 이름이 제공되지 없습니다."],
  },
  group: { type: String },
});

export const Category =
  (mongoose.models?.Category as any as false) ||
  mongoose.model<Categories>("Category", CategorySchema);
