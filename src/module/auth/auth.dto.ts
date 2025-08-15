import { IsNotEmpty, Min, MinLength } from "class-validator";

export default class LoginUserDto {
  @IsNotEmpty()
  @MinLength(6, {
    message: "Password must be at least 6 characters long",
  })
  password!: string;
  @IsNotEmpty({ message: "Email is required" })
  email!: string;
}
