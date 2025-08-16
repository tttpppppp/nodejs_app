import { NextFunction, Request, Response } from "express";
import { TokenData } from "../auth";
import LoginUserDto from "./auth.dto";
import LoginService from "./auth.service";
import { Logger } from "@/core/utils";

class LoginController {
  private userService = new LoginService();
  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: LoginUserDto = req.body;
    try {
      const token = await this.userService.loginUser(userData);
      return res.status(200).json({ message: "Login Successes!", token });
    } catch (error) {
      next(error);
    }
  };
  public loginCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userid = (req as any).user.id;
    Logger.info(`Fetching current user with ID: ${userid}`);
    try {
      const user = await this.userService.loginCurrent(userid);
      return res.status(200).json({ message: "Successes!", user });
    } catch (error) {
      next(error);
    }
  };
}

export default LoginController;
