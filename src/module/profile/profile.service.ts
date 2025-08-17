import mongoose from "mongoose";
import ProfileSchema from "./profile.model";
import { IProfile } from "./profile.interface";
import CreateProfileDto from "./dtos/ProfileDto";
export class ProfileService {
  public async createProfile(profileData: CreateProfileDto): Promise<IProfile> {
    const profile = await ProfileSchema.create(profileData);
    return profile;
  }
  public async getProfileByUserId(userId: string): Promise<IProfile | null> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }
    const profile = await ProfileSchema.findOne({ user: userId })
      .populate("user")
      .exec();
    return profile;
  }
}
