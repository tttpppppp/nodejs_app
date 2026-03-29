import mongoose, { Schema } from "mongoose";
import IUser from "./user.interface";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("Users", UserSchema);
