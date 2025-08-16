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
import UpdateDto from "./dtos/update.dto";
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
  public async updateUser(id: string, userData: UpdateDto): Promise<IUser> {
    if (isEmptyObject(userData)) {
      throw new HttpException(400, "User data cannot be empty");
    }
    const findUser = await this.userSchema.findById(id);
    if (!findUser) {
      throw new HttpException(404, "User does not exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userData.password, salt);
    try {
      const updateUser = await this.userSchema
        .findByIdAndUpdate(
          id,
          {
            ...userData,
            password: hash,
          },
          { new: true }
        )
        .exec();
      if (!updateUser) {
        throw new HttpException(404, "User not found");
      }
      return updateUser;
    } catch (error) {
      throw error;
    }
  }
  public deleteUser = async (id: string): Promise<IUser> => {
    if (!id) {
      throw new HttpException(400, "User ID cannot be empty");
    }
    const findUser = await this.userSchema.findById(id);
    if (!findUser) {
      throw new HttpException(404, "User does not exist");
    }
    try {
      const deleteUser = await this.userSchema.findByIdAndDelete(id).exec();
      if (!deleteUser) {
        throw new HttpException(404, "User not found");
      }
      return deleteUser;
    } catch (error) {
      throw error;
    }
  };
  public getAllUser = async (): Promise<IUser[]> => {
    try {
      const users = await this.userSchema.find().exec();
      return users;
    } catch (error) {
      throw new HttpException(500, "Error retrieving users");
    }
  };
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
