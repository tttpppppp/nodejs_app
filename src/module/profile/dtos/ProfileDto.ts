import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsUrl,
} from "class-validator";
import { Type } from "class-transformer";

class ExperienceDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  company!: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsNotEmpty()
  from!: Date;

  @IsOptional()
  to?: Date;

  @IsOptional()
  current?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}

class EducationDto {
  @IsNotEmpty()
  @IsString()
  school!: string;

  @IsNotEmpty()
  @IsString()
  degree!: string;

  @IsNotEmpty()
  @IsString()
  fieldOfStudy!: string;

  @IsNotEmpty()
  from!: Date;

  @IsOptional()
  to?: Date;

  @IsOptional()
  current?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}

// DTO chính cho Profile
export default class CreateProfileDto {}
