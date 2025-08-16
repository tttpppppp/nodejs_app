import { Routes } from "core/interface";
import { Router } from "express";
import UserController from "./user.controller";
import CreateUserDto from "./dtos/register.dto";
import { validateDto } from "@/core/middleware/validation.middleware";
import UpdateDto from "./dtos/update.dto";
import authMiddleware from "@/core/middleware/auth.middeware";
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
    this.router.put(
      "/update",
      validateDto(UpdateDto),
      this.userController.updateUser
    );
  }
}

export default UserRoute;
