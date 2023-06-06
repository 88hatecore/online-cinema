import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { genSalt, hash, compare } from "bcryptjs";
import { InjectModel } from "nestjs-typegoose";
import { RefreshTokenDto } from "./dto/refreshToken.dto";

import { AuthDto } from "./dto/auth.dto";
import { UserModel } from "../user/user.model";

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) {}

	async login({ email, password }: AuthDto) {
		const user = await this.validateUser(email, password);

		const tokens = await this.issueTokenPair(String(user._id));

		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	async register({ email, password }: AuthDto) {
		const salt = await genSalt(10);
		const newUser = new this.UserModel({
			email,
			password: await hash(password, salt),
		});
		const user = await newUser.save();

		const tokens = await this.issueTokenPair(String(user._id));

		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	async getNewTokens({ refreshToken }: RefreshTokenDto) {
		if (!refreshToken) throw new UnauthorizedException("Please sign in!");

		const result = await this.jwtService.verifyAsync(refreshToken);

		if (!result) throw new UnauthorizedException("Invalid token or expired!");

		const user = await this.UserModel.findById(result._id);

		const tokens = await this.issueTokenPair(String(user._id));

		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	async findByEmail(email: string) {
		return this.UserModel.findOne({ email }).exec();
	}

	async validateUser(email: string, password: string): Promise<UserModel> {
		const user = await this.findByEmail(email);
		if (!user) throw new UnauthorizedException("User not found");

		const isValidPassword = await compare(password, user.password);
		if (!isValidPassword) throw new UnauthorizedException("Invalid password");

		return user;
	}

	async issueTokenPair(userId: string) {
		const data = { _id: userId };

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: "15d",
		});

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: "1h",
		});

		return { refreshToken, accessToken };
	}

	returnUserFields(user: UserModel) {
		return {
			_id: user._id,
			email: user.email,
			isAdmin: user.isAdmin,
		};
	}
}
