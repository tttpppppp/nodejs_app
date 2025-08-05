import { isEmptyObject } from "@/core/utils/helper";
import { TokenData } from "../auth";
import CreateUserDto from "./dtos/register.dto";
import UserSchema from "./user.model";
import { HttpException } from "@/core/exception";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import IUser from "./user.interface";
import jwt from "jsonwebtoken";
import { log } from "winston";
import { Logger } from "@/core/utils";
class UserService {
  private userSchema = UserSchema;
  public async createUser(userData: CreateUserDto): Promise<TokenData> {
    if (isEmptyObject(userData)) {
      throw new HttpException(400, "User data cannot be empty");
    }
    const findUser = await this.userSchema.findOne({
      email: userData.email,
    });
    if (findUser) {
      throw new HttpException(409, "User already exists");
    }
    var url = gravatar.url(userData.email, {
      s: "200",
      r: "g",
      d: "mm",
    });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userData.password, salt);
    try {
      const createUser = await this.userSchema.create({
        ...userData,
        password: hash,
        avatarUrl: url,
      });
      return this.createToken(createUser);
    } catch (error) {
      throw error;
    }
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

export default UserService;
