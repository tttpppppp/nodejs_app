import { Types } from "mongoose";

export interface IPost extends Document {
  _id: string;
  user: Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes?: ILike[];
  comments?: IComment[];
  tags?: string[];
  isPublished: boolean;
}

export interface ILike {
  user: string;
}

export interface IComment {
  _id: string;
  user: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
