import { IsEmail } from "class-validator";

export class UpadateUserDto {
	@IsEmail()
	email: string;

	password?: string;

	isAdmin?: boolean;
}
