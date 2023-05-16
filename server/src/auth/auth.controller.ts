import { AuthService } from "./auth.service";
import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe,
	HttpCode,
} from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { RefreshTokenDto } from "./dto/refreshToken.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("login")
	async login(@Body() dto: AuthDto) {
		return this.authService.login(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("login/access-token")
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.authService.getNewTokens(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("register")
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto);
	}
}
