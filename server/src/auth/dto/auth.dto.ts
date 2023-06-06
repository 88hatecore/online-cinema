import { IsEmail, MinLength, IsString } from "class-validator";

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: "Password cannot be less than 8 charecters",
  })
  @IsString()
  password: string;
}
