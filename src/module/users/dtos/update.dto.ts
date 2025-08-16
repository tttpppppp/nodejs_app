import { IsNotEmpty, Min, MinLength } from "class-validator";

export default class UpdateDto {
  @IsNotEmpty()
  firstName!: string;
  @IsNotEmpty()
  lastName!: string;
  @IsNotEmpty()
  @MinLength(6, {
    message: "Password must be at least 6 characters long",
  })
  password!: string;
  @IsNotEmpty({ message: "Email is required" })
  email!: string;
}
