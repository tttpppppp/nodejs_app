import { Document } from "mongoose";

export interface IProfile extends Document {
  _id: string;
  user: object;
  company?: string;
  website?: string;
  location?: string;
  skills: string[];
  bio?: string;
  experience: IExperience[];
  education: IEducation[];
  social?: ISocial;
  createdAt: Date;
}

export interface IExperience {
  title: string;
  company: string;
  location?: string;
  from: Date;
  to?: Date;
  current?: boolean;
  description?: string;
}

export interface IEducation {
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: Date;
  to?: Date;
  current?: boolean;
  description?: string;
}

export interface ISocial {
  youtube?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
}
