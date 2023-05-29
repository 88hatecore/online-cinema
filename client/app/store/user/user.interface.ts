import { IUser } from "@/shared/types/user.types";

export interface IUserState {
	email: string;
	isAdmin: boolean;
}

export interface ITokens {
	accessToken: string;
	refreshToken: string;
}

export interface IUserInitialState {
	user: IUserState | null;
	isLoading: boolean;
}

export interface IEmailPassword {
	email: string;
	password: string;
}

export interface IAuthResponse extends ITokens {
	user: IUser & {
		isAdmin: boolean;
	};
}
