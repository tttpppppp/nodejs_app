import { NextFunction, Request, Response } from "express";
import { TokenData } from "../auth";
import UserService from "./user.service";
import CreateUserDto from "./dtos/register.dto";
import UpdateDto from "./dtos/update.dto";
import { log } from "winston";
import { Logger } from "@/core/utils";

class UserController {
  private userService = new UserService();
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = req.body;
    try {
      const token = await this.userService.createUser(userData);
      return res.status(201).json({ message: "Create Successes!", token });
    } catch (error) {
      next(error);
    }
  };
  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.query.id as string;
    const userData: UpdateDto = req.body;
    try {
      const token = await this.userService.updateUser(id, userData);
      return res.status(200).json({ message: "Update Successes!", token });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
