import mongoose, { Schema } from "mongoose";
import { IEducation, IExperience, IProfile } from "./profile.interface";

const ExperienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  from: { type: Date, required: true },
  to: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String },
});

const EducationSchema = new Schema<IEducation>({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String },
});

const ProfileSchema = new Schema<IProfile>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    unique: true,
  },
  company: String,
  website: String,
  location: String,
  skills: [String],
  bio: String,
  experience: [ExperienceSchema],
  education: [EducationSchema],
  social: {
    youtube: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProfile>("Profile", ProfileSchema);
