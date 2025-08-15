import { Routes } from "core/interface";
import { Router } from "express";
import { validateDto } from "@/core/middleware/validation.middleware";
import LoginController from "./auth.controller";
import LoginUserDto from "./auth.dto";
import authMiddleware from "@/core/middleware/auth.middeware";
class AuthRoute implements Routes {
  public path = "/auth";
  public method = "get";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  public loginController = new LoginController();

  private initializeRoutes() {
    this.router.post(
      "/login",
      validateDto(LoginUserDto),
      this.loginController.loginUser
    );
    this.router.get(
      "/login",
      authMiddleware,
      this.loginController.loginCurrentUser
    );
  }
}

export default AuthRoute;
