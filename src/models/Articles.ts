import mongoose from "mongoose";

import { Anonymous, AnonymousEntity } from "./Anonymous";
import { Categories, CategoryEntity } from "./Categories";
import { Comments, CommentsEntity } from "./Comments";

export interface ArticleEntity {
  id: string;
  user: null;
  anonymous: AnonymousEntity;
  title: string;
  contents: string;
  comments: CommentsEntity[];
  category: CategoryEntity;
  views: number;
  createdAt: string;
  isHot: boolean;
}
export interface Articles extends mongoose.Document {
  user: null;
  anonymous: Anonymous;
  title: string;
  contents: string;
  comments: Comments[];
  category: Categories;
  views: number;
  isHot: boolean;
}

const ArticleSchema = new mongoose.Schema<Articles>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    anonymous: {
      ip: {
        type: String,
        required: [true, "글 작성자 ip가 제공되지 없습니다."],
      },
      name: {
        type: String,
        required: [true, "글 작성자 이름이 제공되지 없습니다."],
      },
      password: { type: String },
    },
    title: {
      type: String,
      required: [true, "글 제목이 제공되지 않았습니다."],
    },
    contents: {
      type: String,
      required: [true, "글 내용이 제공되지 않았습니다."],
    },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        anonymous: {
          ip: {
            type: String,
            required: [true, "댓글 작성자 ip가 제공되지 없습니다."],
          },
          name: {
            type: String,
            required: [true, "댓글 작성자 이름이 제공되지 없습니다."],
          },
          password: { type: String },
        },
        contents: {
          type: String,
          required: [true, "댓글 내용이 제공되지 없습니다."],
        },
        isChildren: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        default: [],
      },
    ],
    category: {
      type: String,
      ref: "Category",
      required: [true, "카테고리가 제공되지 않았습니다."],
    },
    views: { type: Number, default: 0 },
    isHot: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Article =
  (mongoose.models.Article as any as false) ||
  mongoose.model<Articles>("Article", ArticleSchema);
