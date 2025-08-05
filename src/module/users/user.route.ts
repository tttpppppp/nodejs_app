import { Routes } from "core/interface";
import { Router } from "express";
import UserController from "./user.controller";
import CreateUserDto from "./dtos/register.dto";
import { validateDto } from "@/core/middleware/validation.middleware";
class UserRoute implements Routes {
  public path = "/user";
  public method = "get";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  public userController = new UserController();

  private initializeRoutes() {
    this.router.post(
      "/create",
      validateDto(CreateUserDto),
      this.userController.createUser
    );
  }
}

export default UserRoute;
