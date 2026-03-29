import { Routes } from "core/interface";
import { Router } from "express";
import UserController from "./user.controller";
class UserRoute implements Routes {
  public path = "/user";
  public method = "get";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  public userController = new UserController();

  private initializeRoutes() {
    this.router.post("/create", this.userController.createUser);
  }
}

export default UserRoute;
