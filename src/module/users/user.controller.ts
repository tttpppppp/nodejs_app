import { NextFunction, Request, Response } from "express";
import { TokenData } from "../auth";
import UserService from "./user.service";
import CreateUserDto from "./dtos/register.dto";

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
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

export default UserController;
