import { NextFunction, Request, Response } from "express";
import { ProfileService } from "./profile.service";
import CreateProfileDto from "./dtos/ProfileDto";

export class ProfileController {
  private profileService = new ProfileService();

  public createProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const profileData: CreateProfileDto = req.body;
    try {
      const profile = await this.profileService.createProfile(profileData);
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
