import { IsNotEmpty } from "class-validator";

export class EducationDto {
  @IsNotEmpty({ message: "School name is required" })
  school!: string;
  @IsNotEmpty({ message: "Degree is required" })
  degree!: string;
  @IsNotEmpty({ message: "Field of study is required" })
  fieldOfStudy!: string;
  @IsNotEmpty({ message: "Start date is required" })
  from!: Date;
  @IsNotEmpty({ message: "End date is required" })
  to?: Date;
  @IsNotEmpty({ message: "Description is required" })
  current?: boolean;
  @IsNotEmpty({ message: "Description is required" })
  description?: string;
}
