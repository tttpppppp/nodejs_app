import { Routes } from "core/interface";
import { Router } from "express";
import { validateDto } from "@/core/middleware/validation.middleware";
import { ProfileController } from "./profile.controller";
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
    this.router.get("/detail", this.profileController.getProfile);
  }
}

export default ProfileRoute;
