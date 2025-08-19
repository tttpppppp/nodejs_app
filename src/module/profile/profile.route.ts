import { Routes } from "core/interface";
import { Router } from "express";
import { validateDto } from "@/core/middleware/validation.middleware";
import { ProfileController } from "./profile.controller";
import { EducationDto } from "./dtos/Education.dto";
class ProfileRoute implements Routes {
  public path = "/profile";
  public method = "get";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  public profileController = new ProfileController();

  private initializeRoutes() {
    this.router.post("/create", this.profileController.createProfile);
    this.router.post(
      "/create-experience",
      this.profileController.createExperience
    );
    this.router.get("/detail", this.profileController.getProfile);
    this.router.post(
      "/create-education",
      validateDto(EducationDto),
      this.profileController.createEducation
    );
  }
}

export default ProfileRoute;
