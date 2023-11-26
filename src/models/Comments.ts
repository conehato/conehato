import { ObjectId } from "mongoose";

import { Anonymous, AnonymousEntity } from "./Anonymous";

export interface CommentsEntity {
  id: string;
  user: null;
  anonymous: AnonymousEntity;
  contents: string;
  isChildren: boolean;
  createdAt: string;
}
export interface Comments {
  _id: ObjectId;
  user: null;
  anonymous: Anonymous;
  contents: string;
  isChildren: boolean;
  createdAt: string;
}
