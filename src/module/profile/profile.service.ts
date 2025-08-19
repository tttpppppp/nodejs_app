import mongoose from "mongoose";
import ProfileSchema from "./profile.model";
import { IExperience, IProfile } from "./profile.interface";
import CreateProfileDto from "./dtos/ProfileDto";
import { ExperienceDto } from "./dtos/ExperienceDto";
import { EducationDto } from "./dtos/Education.dto";
import normalizeUrl from "normalize-url";

export class ProfileService {
  public async createProfile(
    userid: string,
    profileData: CreateProfileDto
  ): Promise<IProfile> {
    const { company, bio, social, location, skills, website } = profileData;

    const profileFields: CreateProfileDto = {
      user: userid,
      company,
      bio,
      social: {},
      location,
      skills: Array.isArray(skills)
        ? skills
        : skills?.split(",").map((skill) => skill.trim()),
      website: website
        ? normalizeUrl(website.toString(), { forceHttps: true })
        : undefined,
    };

    for (const [key, value] of Object.entries(social ?? {})) {
      if (value && value !== "") {
        profileFields.social = {
          ...profileFields.social,
          [key]: normalizeUrl(value.toString(), { forceHttps: true }),
        };
      }
    }

    const profile = await ProfileSchema.findOneAndUpdate(
      { user: userid },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

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
  public addEducation = async (
    profileId: string,
    ed: EducationDto
  ): Promise<IProfile> => {
    const findProfile = await ProfileSchema.findById(profileId);
    if (!findProfile) {
      throw new Error("Profile not found");
    }
    findProfile.education.unshift(ed);
    const updatedProfile = await findProfile.save();
    return updatedProfile;
  };
}
