import { isEmptyObject } from "@/core/utils/helper";
import { TokenData } from "../auth";
import { HttpException } from "@/core/exception";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import { log } from "winston";
import LoginUserDto from "./auth.dto";
import IUser from "../users/user.interface";
import UserSchema from "../users/user.model";

class LoginService {
  private userSchema = UserSchema;
  public async loginUser(userData: LoginUserDto): Promise<TokenData> {
    if (isEmptyObject(userData)) {
      throw new HttpException(400, "User data cannot be empty");
    }
    const findUser = await this.userSchema
      .findOne({
        email: userData.email,
      })
      .exec();
    if (!findUser) {
      throw new HttpException(409, "User does not exist");
    }
    const isMatch = await bcrypt.compare(userData.password, findUser.password);
    if (!isMatch) {
      throw new HttpException(401, "Wrong password or email");
    }
    return this.createToken(findUser);
  }
  public async loginCurrent(userId: string): Promise<TokenData> {
    if (!userId) {
      throw new HttpException(400, "User ID cannot be empty");
    }
    const findUser = await this.userSchema.findById(userId);
    if (!findUser) {
      throw new HttpException(404, "User not found");
    }
    return findUser;
  }
  public createToken = (user: IUser): TokenData => {
    const payload = { id: user._id, email: user.email };
    const privateKey = process.env.SECRET_KEY as string;
    const token = jwt.sign(payload, privateKey, {
      expiresIn: "1h",
    });
    return {
      token,
    };
  };
}

export default LoginService;
