import mongoose, { Schema, Document } from "mongoose";
import { IPost } from "./post.interface";

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const PostSchema = new Schema<IPost>(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    comments: [CommentSchema],
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
