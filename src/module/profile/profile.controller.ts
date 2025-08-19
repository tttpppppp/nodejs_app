import { NextFunction, Request, Response } from "express";
import { ProfileService } from "./profile.service";
import CreateProfileDto from "./dtos/ProfileDto";
import { ExperienceDto } from "./dtos/ExperienceDto";
import { EducationDto } from "./dtos/Education.dto";

export class ProfileController {
  private profileService = new ProfileService();

  public createProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const profileData: CreateProfileDto = req.body;
    const userId = req.body.user as string;
    try {
      const profile = await this.profileService.createProfile(
        userId,
        profileData
      );
      return res
        .status(201)
        .json({ message: "Profile created successfully!", profile });
    } catch (error) {
      next(error);
    }
  };

  public createExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const profileId = req.query.id as string;
    const experienceData: ExperienceDto = req.body;
    try {
      const profile = await this.profileService.addExperience(
        profileId,
        experienceData
      );
      return res
        .status(201)
        .json({ message: "Profile created successfully!", profile });
    } catch (error) {
      next(error);
    }
  };
  public createEducation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const profileId = req.query.id as string;
    const educationData: EducationDto = req.body;
    try {
      const profile = await this.profileService.addEducation(
        profileId,
        educationData
      );
      return res
        .status(201)
        .json({ message: "Profile created successfully!", profile });
    } catch (error) {
      next(error);
    }
  };

  public getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.query.id as string;
    try {
      const profile = await this.profileService.getProfileByUserId(userId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      return res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  };
}
