import { IsEmail, IsString } from "class-validator";

export class UpadateUserDto {
	@IsEmail()
	email: string;

	@IsString()
	password?: string;

	isAdmin?: boolean;
}
