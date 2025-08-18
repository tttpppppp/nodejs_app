import mongoose from "mongoose";
import ProfileSchema from "./profile.model";
import { IExperience, IProfile } from "./profile.interface";
import CreateProfileDto from "./dtos/ProfileDto";
import { ExperienceDto } from "./dtos/ExperienceDto";
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
  public addExperience = async (
    profileId: string,
    ex: ExperienceDto
  ): Promise<IProfile> => {
    const findProfile = await ProfileSchema.findById(profileId);
    if (!findProfile) {
      throw new Error("Profile not found");
    }
    findProfile.experience.unshift(ex);
    const updatedProfile = await findProfile.save();
    return updatedProfile;
  };
}
