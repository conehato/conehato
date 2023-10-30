import mongoose from "mongoose";

export interface CategoryEntity {
  id: string;
  name: string;
}
export interface Categories extends mongoose.Document {
  _id: string;
  name: string;
  parent_id: Categories;
}

const CategorySchema = new mongoose.Schema<Categories>({
  _id: { type: String, required: [true, "카테고리의 키가 제공되지 없습니다."] },
  name: {
    type: String,
    required: [true, "카테고리의 이름이 제공되지 없습니다."],
  },
  parent_id: { type: String, ref: "Category" },
});

export const Category =
  (mongoose.models.Category as any as false) ||
  mongoose.model<Categories>("Category", CategorySchema);
