import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly AuthService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("login")
	async login(@Body() data: AuthDto) {
		return this.AuthService.login(data);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("login/access-token")
	async getNewTokens(@Body() data: RefreshTokenDto) {
		return this.AuthService.getNewTokens(data);
	}

	@UsePipes(new ValidationPipe())
	@Post("register")
	async register(@Body() dto: AuthDto) {
		const oldUser = await this.AuthService.findByEmail(dto.email);
		if (oldUser)
			throw new BadRequestException(
				"User with this email is already in the system"
			);

		return this.AuthService.register(dto);
	}
}
