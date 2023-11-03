import { Anonymous, AnonymousEntity } from "./Anonymous";

export interface CommentsEntity {
  id: string;
  user: null;
  anonymous: AnonymousEntity;
  contents: string;
  createdAt: string;
}
export interface Comments {
  user: null;
  anonymous: Anonymous;
  contents: string;
  createdAt: string;
}
